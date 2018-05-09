import axios from 'axios';
const APIKEY = "28c587a9a1294197970d244e4e3213e3"

export default {
    getArticles: function(topic,start,end) {
        return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + APIKEY + "&q=" + topic + "&begin_date=" + start + "0101&end_date=" + end + "0101")
    },

    saveArticle: function(article) {
        return axios.post("/api/saved", article)
    },

    getSaved: function() {
        return axios.get("/api/saved")
    },

    deleteSaved: function(id) {
        return axios.delete("/api/saved/" + id)
    }
}