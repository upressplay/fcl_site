$(document).ready(function(){  

    site.videos.initialize();

}); 

site.videos = {
    id:"videos",
    data:site.videos_data,
    set_start:-2,
    set_end:-1,
    set_total:2,
    article_open:false,
    loading:false,
    current:0,
    initialize : function () {


        this.render();

        var thisobj = this;

        $( window ).resize(function() { thisobj.resize(); });
        
    },
    render : function () {

        var thisobj = this;

        site.trace("render");   


        $('#videos a').click(function(event){
            event.preventDefault();
            var id = $(this).attr('entry_id');
            thisobj.open_article(id);
        });

        $('#load_more_videos_btn').click(function(event){
            thisobj.load_more();
        });
     
        if(site.device == "desktop") {
            $('#load_more_videos_btn').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#fff", backgroundColor:'#d90e0e', ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('#load_more_videos_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#000", backgroundColor:'#fff', ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }

        this.load_more();
        this.resize();

        site.trace("site.segments[1] = "+site.segments[1]+" site.segments[2] = "+site.segments[2]);
        if(site.segments[1] == "videos" && site.segments[2] != "") {
            TweenMax.delayedCall(1, thisobj.open_article, [site.segments[2]], this);
        }
        
    },

    load_more : function () {
        
        this.set_start = this.set_start + this.set_total;
        this.set_end = this.set_end + this.set_total;
        if(this.set_end > this.data.length-1) this.set_end = this.data.length-1;

        site.trace('load_more')
        site.trace('this.set_start = '+this.set_start+" this.set_end = "+this.set_end)
        this.set();

        
    },

    set : function () {

        var i;
        var thisobj = this;

        for (i = 0; i < this.data.length; i++) { 
            site.trace("this.data[i].id = "+this.data[i].loaded+" i = "+i+" this.set_start = "+this.set_start+" this.set_end = "+this.set_end);
            if(i >= this.set_start && i <= this.set_end ) {
                site.trace("Hey yo")

                var new_content = new Image();  
                new_content.id = i;
                new_content.onload = function () {   

                    thisobj.thumb_loaded(this.id);

                } 
                var content_url = site.cdn+this.data[i].img['sizes']["video-thumb"];
                site.trace("content_url = "+content_url)
                $('#'+this.data[i].id).find('.videos_thumb').append('<img src="'+content_url+'">')


                new_content.src = content_url;
            }
        } 

        if(this.set_end == this.data.length-1) {

            TweenMax.to($('#load_more_videos_btn'), .5, {opacity:0, onComplete:site.div_display, onCompleteParams:['#load_more_videos_btn', 'none'], ease:"Power1.easeInOut", ooverwrite:2}); 
        }
    },

    thumb_loaded : function (val) {
        site.trace("thumb_loaded val = "+val)
        site.div_display('#'+this.data[val].id, "inline-block")
        TweenMax.to($('#'+this.data[val].id), .5, {opacity:1, ease:"Power1.easeInOut", ooverwrite:2}); 
    
    },

    open_article : function (val) {
        site.trace("open_article val = "+val)

        var i;
        var thisobj = this;

        if(this.article_open) {
            
            this.close_article();
            
        } else {

            
                
            for (i = 0; i < this.data.length; i++) {
                site.trace("this.data[i].id = "+this.data[i].id)
                if(this.data[i].id == val) {
                    $('body').prepend('<div id="videos_overlay"></div>');

                    site.set_url("videos",this.data[i].id);
                    
                    
                    $('#videos_overlay').append('<div id="videos_nav"></div>');
                    $('#videos_nav').append('<div id="videos_nav_img"><img src="'+site.cdn+'/images/videos_header.png"></div>');
                    $('#videos_nav').append('<div type="right" class="videos_article_btn fa fa-arrow-circle-right" ></div>');
                    $('#videos_nav').append('<div type="close" class="videos_article_btn fa fa-times" ></div>');
                    $('#videos_nav').append('<div type="left" class="videos_article_btn fa fa-arrow-circle-left" ></div>');

                    $('.videos_article_btn').click(function(event){
                        var type = $(this).attr('type');
                        thisobj.nav(type);
                    });

                    $('#videos_overlay').append('<div id="videos_article"></div>');
                    $('#videos_article').append('<div id="videos_article_img"></div>');

                    site.trace("this.data[i].type = "+this.data[i].type)
                    if(this.data[i].type == "youtube") $('#videos_article_img').append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+this.data[i].video_id+'?rel=0" frameborder="0" allowfullscreen></iframe>');

                    if(this.data[i].type == "vimeo") $('#videos_article_img').append('<iframe src="https://player.vimeo.com/video/'+this.data[i].video_id+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

                    $('#videos_article').append('<span id="videos_article_top"></span>');
                    $('#videos_article_top').append('<span class="videos_article_title">'+this.data[i].title+'</span>');

                    $('#videos_article_top').append('<div class="videos_share">Share: </div>');


                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="facebook" class="videos_share_btn"><span class="fa fa-facebook" aria-hidden="true" ></span><span class="screen-reader-text">Facebook</span></div>');

                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="twitter" class="videos_share_btn"><span class="fa fa-twitter" aria-hidden="true" ></span><span class="screen-reader-text">Twitter</span></div>');

                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="google" class="videos_share_btn"><span class="fa fa-google" aria-hidden="true" ></span><span class="screen-reader-text">Google</span></div>');

                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="pinterest" class="videos_share_btn"><span class="fa fa-pinterest" aria-hidden="true" ></span><span class="screen-reader-text">Pinterest</span></div>');

                    $('#videos_article_top .videos_share').append('<div entryid="'+this.data[i].id+'" type="tumblr" class="videos_share_btn"><span class="fa fa-tumblr" aria-hidden="true" ></span><span class="screen-reader-text">Tumblr</span></div>');

                     $('.videos_share_btn').click(function(event){
                        var type = $(this).attr('type');
                        var id = $(this).attr('entryid');
                        thisobj.share_article(type,id);
                    });
                    
                    if(site.device == "desktop") {
                        $('.videos_share_btn').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#d90e0e", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('.videos_share_btn').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }

                    
                    $('#videos_article').append('<span class="videos_article_desc">'+this.data[i].desc+'</span>');

         

                    $('#videos_article_close').click(function(event){
                        thisobj.open_article();
                        });

                    if(site.device == "desktop") {
                        $('#videos_article_close').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#d90e0e", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('#videos_article_close').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }
                           
                    this.open_overlay();
                    this.resize();

                    this.current = i;
                }
            }

            
            
        }

    },

    close_article : function () {

        site.set_url("videos");

        this.article_open = false;

        TweenMax.to($('#videos_overlay'), .5, {height:0, ease:"Power1.easeInOut", onComplete:this.reset_article, onCompleteScope:this, overwrite:2}); 
    },

    
    reset_article : function () {
        $('#videos_overlay').remove();
    },

    share_article : function (type, id) {
        
        site.trace("share_article type = "+type+" id = "+id);

        var i;
        for (i = 0; i < this.data.length; i++) {
            if(this.data[i].id == id) {

                var url = "http://"+site.site_url+"/"+this.id+"/"+this.data[i].id;
                var img = this.data[i].img['sizes']['share'];
                var title = this.data[i].title;   
                var desc = this.data[i].desc;  
                site.share({type:type, id:id, url:url, img:img, title:title, desc:desc});
            }
        }

    },

    nav : function (type) {
        
        var thisobj = this;

        site.trace("nav type = "+type);

        this.close_article();

        if(type == "close") return;

        if(type == "left") {
            this.new = this.current-1;
        } else {
            this.new = this.current+1;
        }
        if(this.new < 0) this.new = this.data.length-1;
        if(this.new > this.data.length-1) this.new = 0;

        TweenMax.delayedCall(.55, thisobj.open_article, [this.data[this.new].id], this);
    },


    open_overlay : function (val) {

        this.article_open = true;

        TweenMax.to($('#videos_overlay'), .5, {height:site.window_height(), ease:"Power1.easeInOut", overwrite:2}); 

    },


         
    resize : function () {

        site.trace("resize");

        var thisobj = this;


            
    },

      
    

};
