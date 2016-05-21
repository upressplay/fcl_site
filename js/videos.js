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

    videos_img_w : function () {
        var value = 400 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .7;
        return value;
    }, 
    videos_entry_tb : function () {
        var value = 10 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .01;
        return value;
    }, 

    videos_entry_lr : function () {
        var value = 55 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    }, 




    videos_holder_w : function () {
        var value = 1364 * site.scale();;
        if(site.device == "mobile") value = site.window_width() * .7;
        return value;
    },

    videos_article_close_size : function () {
        var value = 36 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    videos_article_close_leading : function () {
        var value = 75 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    }, 

    videos_article_desc_size : function () {
        var value = 16 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .04;
        return value;
    },

    videos_article_desc_leading : function () {
        var value = 32 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .07;
        return value;
    }, 

    videos_article_title_size : function () {
        var value = 55 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    videos_article_title_leading : function () {
        var value = 75 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    }, 

    videos_article_img_rb : function () {
        var value = 25 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .02;
        return value;
    },

    videos_article_img_w : function () {
        var value = 600 * site.scale();
        if(site.device == "mobile") value = site.window_width() * 1;
        return value;
    },

    videos_read_more_size : function () {
        var value = 33 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .06;
        return value;
    },

    videos_read_more_leading : function () {
        var value = 48 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .09;
        return value;
    }, 



    videos_desc_size : function () {
        var value = 16 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .04;
        return value;
    }, 

    videos_desc_leading : function () {
        var value = 24 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    }, 

    videos_title_size : function () {
        var value = 66 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .09;
        return value;
    }, 

    videos_title_leding : function () {
        var value = 60 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .12;
        return value;
    }, 

    videos_title_t: function () {
        var value = 10 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    }, 

    

    videos_img_h : function () {
        var value = (216/400) * this.videos_img_w();
        return value;
    },  

    arrow_tb : function () {
        var value = 240 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .5;
        return value;
    }, 

    arrow_w : function () {
        var value = 68 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    },  

    arrow_h : function () {
        var value = (114/68) * this.arrow_w();
        return value;
    },  
    

};
