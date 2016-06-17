$(document).ready(function(){  

    site.gallery.initialize();

}); 

site.gallery = {
    id:"gallery",
    data:site.gallery_data,
    set_start:-10,
    set_end:-1,
    set_total:10,
    overlay_open:false,
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


        $('#gallery a').click(function(event){
            event.preventDefault();
            var id = $(this).attr('entry_id');
            thisobj.open_article(id);
        });

        $('#load_more_gallery_btn').click(function(event){
            thisobj.load_more();
        });

        if(site.device == "desktop") {
            $('#load_more_gallery_btn').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#fff", backgroundColor:'#d90e0e', ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('#load_more_gallery_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#fff", backgroundColor:'#000', ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }

        site.trace(this.id+" this.data.length = "+this.data.length)
        if(this.data.length < 10) {
            this.set_total = 5;

        }
        
        this.set_start = this.set_total * -1;
        this.set_end = -1;

        this.load_more();
        this.resize();

        site.trace("site.segments[1] = "+site.segments[1]+" site.segments[2] = "+site.segments[2]);
        if(site.segments[1] == "gallery" && site.segments[2] != "") {
            TweenMax.delayedCall(1, thisobj.open_article, [site.segments[2]], this);
        }
        
    },

    load_more : function () {
        
        this.set_start = this.set_start + this.set_total;
        this.set_end = this.set_end + this.set_total;
        if(this.set_end > this.data.length-1) this.set_end = this.data.length-1;

        //site.trace(this.id+' load_more')
        //site.trace('this.set_start = '+this.set_start+" this.set_end = "+this.set_end)
        this.set();   

        
    },

    set : function () {

        var i;
        var thisobj = this;

        for (i = 0; i < this.data.length; i++) { 
            //site.trace("this.data[i].id = "+this.data[i].loaded+" i = "+i+" this.set_start = "+this.set_start+" this.set_end = "+this.set_end);
            if(i >= this.set_start && i <= this.set_end) {
                //site.trace("Hey yo")

                var new_content = new Image();  
                new_content.id = i;
                new_content.onload = function () {   

                    thisobj.thumb_loaded(this.id);

                } 
                var content_url = this.data[i].img['sizes']['gallery-thumb'];
                $('#'+this.data[i].id).append('<img src="'+content_url+'">')


                new_content.src = content_url;
            }
        } 

        if(this.set_end == this.data.length-1) {
            TweenMax.to($('#load_more_gallery'), .5, {opacity:0, onComplete:site.div_display, onCompleteParams:['#load_more_gallery_btn', 'none'], ease:"Power1.easeInOut", ooverwrite:2}); 
        }
    },

    thumb_loaded : function (val) {
        //site.trace("thumb_loaded val = "+val)
        site.div_display('#'+this.data[val].id, "inline-block")
        TweenMax.to($('#'+this.data[val].id), .5, {opacity:1, ease:"Power1.easeInOut", ooverwrite:2}); 
    },

    open_article : function (val) {
        site.trace("open_article val = "+val)

        var i;
        var thisobj = this;

        if(this.overlay_open) {

            this.close_article();
        } else {

            
                
            for (i = 0; i < this.data.length; i++) {
                site.trace("this.data[i].id = "+this.data[i].id)
                if(this.data[i].id == val) {

                    $('body').prepend('<div id="gallery_overlay"></div>');

                    site.set_url("gallery",this.data[i].id);
                    
                    
                    $('#gallery_overlay').append('<div id="gallery_nav"></div>');
                    $('#gallery_nav').append('<div id="gallery_nav_img"><img src="'+site.cdn+'/images/gallery_header.png"></div>');
                    $('#gallery_nav').append('<div type="right" class="gallery_article_btn fa fa-arrow-circle-right" ></div>');
                    $('#gallery_nav').append('<div type="close" class="gallery_article_btn fa fa-times" ></div>');
                    $('#gallery_nav').append('<div type="left" class="gallery_article_btn fa fa-arrow-circle-left" ></div>');

                    $('.gallery_article_btn').click(function(event){
                        var type = $(this).attr('type');
                        thisobj.nav(type);
                    });

                    $('#gallery_overlay').append('<div id="gallery_article"></div>');
                    $('#gallery_article').append('<div id="gallery_article_img"></div>');

                    var new_content = new Image();  
                    new_content.id = i;
                    new_content.onload = function () {   

                        thisobj.img_loaded(this.id);

                    } 

                    var img = this.data[i].img.url;

                    $('#gallery_article_img').append('<img src="'+img+'">');

                    $('#gallery_article').append('<span id="gallery_article_top"></span>');
                    $('#gallery_article_top').append('<span class="gallery_article_title">'+this.data[i].title+'</span>');

                    $('#gallery_article_top').append('<div class="gallery_share">Share: </div>');


                    $('#gallery_article_top .gallery_share').append('<div entryid="'+this.data[i].id+'" type="facebook" class="gallery_share_btn"><span class="fa fa-facebook" aria-hidden="true" ></span><span class="screen-reader-text">Facebook</span></div>');

                    $('#gallery_article_top .gallery_share').append('<div entryid="'+this.data[i].id+'" type="twitter" class="gallery_share_btn"><span class="fa fa-twitter" aria-hidden="true" ></span><span class="screen-reader-text">Twitter</span></div>');


                    $('#gallery_article_top .gallery_share').append('<div entryid="'+this.data[i].id+'" type="google" class="gallery_share_btn"><span class="fa fa-google" aria-hidden="true" ></span><span class="screen-reader-text">Google</span></div>');

                    $('#gallery_article_top .gallery_share').append('<div entryid="'+this.data[i].id+'" type="pinterest" class="gallery_share_btn"><span class="fa fa-pinterest" aria-hidden="true" ></span><span class="screen-reader-text">Pinterest</span></div>');

                    $('#gallery_article_top .gallery_share').append('<div entryid="'+this.data[i].id+'" type="tumblr" class="gallery_share_btn"><span class="fa fa-tumblr" aria-hidden="true" ></span><span class="screen-reader-text">Tumblr</span></div>');



                     $('.gallery_share_btn').click(function(event){
                        var type = $(this).attr('type');
                        var id = $(this).attr('entryid');
                        site.trace("gallery_share_btn type = "+type+" id = "+id);
                        thisobj.share_article(type,id);
                    });
                    
                    if(site.device == "desktop") {
                        $('.gallery_share_btn').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#d90e0e", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('.gallery_share_btn').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }
                    
                    $('#gallery_article').append('<span class="gallery_article_desc">'+this.data[i].desc+'</span>');



                    if(site.device == "desktop") {
                        $('.gallery_article_btn').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#d90e0e", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('.gallery_article_btn').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }
                           
                    new_content.src = img;
                    
                    this.resize();

                    this.current = i;
                }
            }

            
            
        }

    },

    close_article : function () {

        site.set_url(this.id);

        this.overlay_open = false;

        TweenMax.to($('#gallery_overlay'), .5, {height:0, ease:"Power1.easeInOut", onComplete:this.reset_article, onCompleteScope:this, overwrite:2}); 
    },

    
    reset_article : function () {
        $('#gallery_overlay').remove();
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

    share_article : function (type, id) {
        
        site.trace("share_article type = "+type+" id = "+id);

        var i;
        for (i = 0; i < this.data.length; i++) {
            if(this.data[i].id == id) {

                var url = "http://"+site.site_url+"/"+this.id+"/"+this.data[i].id;
                var img = this.data[i].img.url;
                var title = "%23"+site.hashtag+" "+this.data[i].title;   
                var desc = this.data[i].desc;  
                site.share({type:type, id:id, url:url, img:img, title:title, desc:desc});
            }
        }

    },

    img_loaded : function (val) {

        this.overlay_open = true;

        TweenMax.to($('#gallery_overlay'), .5, {height:site.window_height(), ease:"Power1.easeInOut", overwrite:2}); 

    },


         
    resize : function () {

        site.trace("resize");

        var thisobj = this;


            
    },

    

};
