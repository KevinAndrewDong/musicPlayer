var app = new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],
        musicUrl:"",
        hotComments:[],
        isPlaying:false,
        musicCover:"",
        mvUrl:"",
        isShow:false
    },
    methods:{
        searchMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then
            (function(response){
                //console.log(response);
                that.musicList = response.data.result.songs;
            },
            function(error){})
        },
        playMusic:function(musicId){
            //console.log(musicId);
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
                function(response){
                //console.log(response.data.data[0].url);
                that.musicUrl = response.data.data[0].url;
            },function(err){ }
            )

            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
                function(response){
                    //console.log(response);
                    that.musicCover = response.data.songs[0].al.picUrl;
                },function(err){}
            )
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
                function(response){
                    //console.log(response.data.hotComments);
                    that.hotComments = response.data.hotComments;
                },function(err){}
            )
        },
        play:function(){
            this.isPlaying = true;
            this.mvUrl = '';
        },
        pause:function(){
            this.isPlaying = false;
        },
        playMV:function(mvid){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
                function(response){
                    //console.log(response);
                    //console.log(response.data.data.url);
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                    console.log(that.mvUrl);
                },function(err){}
            )
        },
        hide:function(){
            this.isShow = false;
            mvUrl = "";
        }
    }
})