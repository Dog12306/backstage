import Axios from "axios";

var url = "http://www.bufantec.com/api/douban/movie";
var imgurl = "https://images.weserv.nl/?url=";
function getMovie (type,par){
    return Axios.get(url + type + par)
}
export default{
    getMovie
}