<template>
  <div>
    <div v-if="locationHash === '#/dashboard'">
      <h2 class="title">Article List</h2>
      <el-table
        :data="shapedArticles"
        stripe
        style="width: 90%; margin: 0 auto"
        @row-click="handleSelectionChangeDashboard"
      >
        <el-table-column prop="username" label="Username" width="180">
        </el-table-column>
        <el-table-column prop="time" label="Time" width="180">
        </el-table-column>
        <el-table-column prop="title" label="Title"> </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-table
        :data="myShapedArticles"
        stripe
        style="width: 90%; margin: 0 auto"
        @row-click="handleSelectionChange"
      >
        <el-table-column prop="username" label="Username" width="180">
        </el-table-column>
        <el-table-column prop="time" label="Time" width="180">
        </el-table-column>
        <el-table-column prop="title" label="Title"> </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogTableVisibleProfile">
      <ul class="list">
        <li class="list-item">
          <span>Username</span>
          <span>{{ selectedMyArticle?.author?.username }}</span>
        </li>
        <li class="list-item">
          <span>Photo</span>
          <span
            ><img
              style="width: 20px"
              v-bind:src="selectedMyArticle?.author?.image"
              alt="Photo"
          /></span>
        </li>
        <li class="list-item">
          <span>Title</span> <span>{{ selectedMyArticle?.title }}</span>
        </li>
        <li class="list-item">
          <span>Description</span>
          <span>{{ selectedMyArticle?.description }}</span>
        </li>
      </ul>
    </el-dialog>
    <el-dialog :visible.sync="dialogTableVisibleDashboard">
      <ul class="list">
        <li class="list-item">
          <span>Username</span>
          <span>{{ selectedArticle?.author?.username }}</span>
        </li>
        <li class="list-item">
          <span>Photo</span>
          <span
            ><img
              style="width: 20px"
              v-bind:src="selectedArticle?.author?.image"
              alt="Photo"
          /></span>
        </li>
        <li class="list-item">
          <span>Title</span> <span>{{ selectedArticle?.title }}</span>
        </li>
        <li class="list-item">
          <span>Description</span>
          <span>{{ selectedArticle?.description }}</span>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    msg: String,
  },
  data() {
    return {
      articles: [],
      shapedArticles: [],
      myArticles: [],
      myShapedArticles: [],
      selectedMyArticle: {},
      selectedArticle: {},
      locationHash: "",
      dialogTableVisibleProfile: false,
      dialogTableVisibleDashboard: false,
    };
  },
  mounted() {
    this.locationHash = window.location.hash;
    if (this.locationHash === "#/dashboard") {
      fetch("https://api.realworld.io/api/articles", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            this.articles = res.articles;
            this.shapedArticles = this.tableShape(res.articles);
          }
        })
        .catch((res) => console.log(res));
    } else if (window.location.hash === "#/profile") {
      fetch(
        `https://api.realworld.io/api/articles?author=${
          JSON.parse(localStorage.getItem("userData")).username
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          this.myArticles = res.articles;
          this.myShapedArticles = this.tableShape(res.articles);
        });
    }
  },
  methods: {
    deleteArticle(row) {
      fetch(`https://api.realworld.io/api/articles/${row.slug}`, {
        method: "DELETE",
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
    },
    tableShape(articles, locationHash) {
      return articles.map((article) => {
        return {
          username: article.author.username,
          time:
            locationHash === "#/profile"
              ? article.updatedAt.slice(0, 10)
              : article.createdAt.slice(0, 10),
          title: article.title,
          slug: article.slug,
        };
      });
    },
    handleSelectionChange(selectedRows) {
      this.dialogTableVisibleProfile = true;
      this.selectedMyArticle = this.myArticles.find(
        (article) => article.slug === selectedRows.slug
      );
    },
    handleSelectionChangeDashboard(selectedRows) {
      this.dialogTableVisibleDashboard = true;
      this.selectedArticle = this.articles.find(
        (article) => article.slug === selectedRows.slug
      );
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: center;
}
.list {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 0;
  padding: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
}

.list-item:last-child {
  
}

.list-item:not(:last-child) {
  border-bottom: 1px solid rgb(221, 221, 221);
  padding-bottom: 15px;
}
</style>
