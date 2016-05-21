$(document).ready(function(){  

    site.news.initialize();

}); 

site.news = {
    id:"news",
    data:site.news_data,
    set_start:0,
    set_end:2,
    set_total:3,
    news_set:[],
    article_open:false,
    loading:false,
    transition_entry:-1,
    direction:"right",
    device_state:"",
    current:0,
    initialize : function () {


        this.render();

        var thisobj = this;

        $( window ).resize(function() { thisobj.resize(); });
        
    },
    render : function () {

        var thisobj = this;

        site.trace("render");   

        $('#news_arrow_l').click(function(event){
            thisobj.next("left");
        });

        $('#news_arrow_r').click(function(event){
            thisobj.next("right");
        });

        this.set_articles();
            

        for (i = 0; i < this.news_set.length; i++) {
            site.trace("this.news_set[i] = "+this.news_set[i])
        }

        site.trace("site.segments[1] = "+site.segments[1]+" site.segments[2] = "+site.segments[2]);
        if(site.segments[1] == this.id && site.segments[2] != "") {
            TweenMax.delayedCall(1, thisobj.open_article, [site.segments[2]], this);
        }

        this.set_btns();
        this.resize();


        
    },

    next : function (val) {
        
        site.trace("next val = "+val);
        
        var thisobj = this;
        var new_id = 0;
        var new_l = 0;

        if(this.loading) return;
        this.loading = true;

        this.direction = val;

        if(this.direction == "right") {

            
            new_id = this.news_set[this.news_set.length-1] + 1;

            if(new_id > this.data.length-1) new_id = 0;

            new_l = (this.news_img_w() + this.news_entry_lr()) * 3;

            this.news_set.push(new_id);


        } else {

            new_id = this.news_set[0] - 1;

            if(new_id < 0) new_id = this.data.length-1;

            new_l = (this.news_img_w() + this.news_entry_lr()) * -1;

            this.news_set.unshift(new_id);
        }

        site.trace("next            new_id = "+new_id+" tthis.news_set.length = "+this.news_set.length)
        site.trace("this.data[new_id].ext_link = "+this.data[new_id].ext_link)
        
        if(this.data[new_id].ext_link != "") {
            $('#news_holder').append('<a href="'+this.data[new_id].ext_link+'" entry_id="'+this.data[new_id].id+'" target="_blank"><div class="news_entry" id="'+this.data[new_id].id+'"></div></a>'); 
        } else {
            $('#news_holder').append('<a href="/news/'+this.data[new_id].id+'" entry_id="'+this.data[new_id].id+'"><div class="news_entry" id="'+this.data[new_id].id+'"></div></a>');     
        }
        

        var img_url = this.data[new_id].img['sizes']['news-thumb'];

        site.trace("this.data[new_id].img = "+this.data[new_id].img)
        var new_content = new Image();  
        new_content.id = new_id;
        new_content.onload = function () {   

            thisobj.thumb_loaded(this.id);

        } 

        $('#'+this.data[new_id].id).css({
            "left":new_l+"px",
            "top":this.news_entry_tb()+"px",
            "opacity":"0"
            });

        $('#'+this.data[new_id].id).append('<div class="news_img"></div>');

        $('#'+this.data[new_id].id).find(".news_img").append('<img src="'+img_url+'">');
        $('#'+this.data[new_id].id).append('<div class="news_info"></div>');
        $('#'+this.data[new_id].id).find(".news_info").append('<div class="news_title">'+this.data[new_id].title+'</div>');
        $('#'+this.data[new_id].id).find(".news_info").append('<div class="news_desc">'+this.data[new_id].short_desc+'</div>');

        $('#'+this.data[new_id].id).find(".news_info").append('<div class="news_read_more">- Read More -</div>');


        new_content.src = img_url;

        
    },

    set_articles : function () {

        var i;

        $('#news_holder').html('');
        this.news_set = [];

        if(site.device == "mobile") {
            this.news_set.push(0); 

            this.remove_entry(this.data[1].id); 
            this.remove_entry(this.data[2].id);    
        } else {
            for (i = 0; i < this.data.length; i++) { 
                if(i < 3) {
                    this.news_set.push(i);
                }
            } 
            
        }

        for (i = 0; i < this.news_set.length; i++) { 

            var new_id = this.news_set[i];

            site.trace("this.data[new_id].ext_link = "+this.data[new_id].ext_link)

            if(this.data[new_id].ext_link != "") {
                $('#news_holder').append('<a href="'+this.data[new_id].ext_link+'" entry_id="'+this.data[new_id].id+'" target="_blank"><div class="news_entry" id="'+this.data[new_id].id+'"></div></a>');  
            } else {
                $('#news_holder').append('<a href="/news/'+this.data[new_id].id+'" entry_id="'+this.data[new_id].id+'"><div class="news_entry" id="'+this.data[new_id].id+'"></div></a>');     
            }
            
            var img_url = this.data[new_id].img['sizes']['news-thumb'];

            site.trace("this.data[new_id].img = "+this.data[new_id].img)

            var new_content = new Image();  
            new_content.id = new_id;
            new_content.onload = function () {   

            } 

            $('#'+this.data[new_id].id).css({
                "opacity":"0"
                });

            $('#'+this.data[new_id].id).append('<div class="news_img"></div>');

            $('#'+this.data[new_id].id).find(".news_img").append('<img src="'+img_url+'">');

            $('#'+this.data[new_id].id).append('<div class="news_info"></div>');
            $('#'+this.data[new_id].id).find(".news_info").append('<div class="news_title">'+this.data[new_id].title+'</div>');
            $('#'+this.data[new_id].id).find(".news_info").append('<div class="news_desc">'+this.data[new_id].short_desc+'</div>');
            $('#'+this.data[new_id].id).find(".news_info").append('<div class="news_read_more">- Read More -</div>');


            new_content.src = img_url;         
        } 

        this.set_btns();

    },

    thumb_loaded : function (val) {
        site.trace("thumb_loaded val "+val);

        this.set_btns();

        var entry_l;
        var entry_id;


            if(this.direction == "right") {
                entry_l = this.news_entry_lr() + this.news_img_w() * -1;
                entry_id = this.news_set[0];
                
            } else {
                entry_l = this.news_entry_lr() + this.news_img_w() * 4;
                entry_id = this.news_set[this.news_set.length-1];
            }

            site.trace("thumb_loaded --------  this.data[entry_id].id = "+this.data[entry_id].id+" entry_l = "+entry_l+" entry_id = "+entry_id)
            TweenMax.to($('#'+this.data[entry_id].id), .5, {left:entry_l+"px", opacity:0, onCompleteScope:this, onComplete:this.remove_entry, onCompleteParams:[this.data[entry_id].id], ease:"Power1.easeInOut", overwrite:2}); 


            if(this.direction == "right") {
                this.news_set.splice(0,1);
                site.trace("this.news_set.length = "+this.news_set.length)
                
            } else {
                this.news_set.pop();
            }

        this.resize();

        this.loading = false;
    },

    remove_entry : function (id) {
        site.trace("remove_entry id = "+id)

        $( "#news_holder a" ).each(function( index ) {


            
            var entry_id = $(this).attr('entry_id');
            site.trace("entry_id = "+entry_id +" id = "+id)

            if(entry_id == id) $(this).remove();
        });
    },

    open_article : function (val) {
        site.trace("open_article val = "+val)

        var i;
        var thisobj = this;

        if(this.article_open) {

            this.close_article();

        } else {

            
                
            for (i = 0; i < this.data.length; i++) {
                site.trace("this.data[i].id = "+this.data[i].id+" val = "+val)
                if(this.data[i].id == val) {
                    $('body').prepend('<div id="news_overlay"></div>');

                    site.set_url(this.id,this.data[i].id);
                    
                    
                    $('#news_overlay').append('<div id="news_nav"></div>');
                    $('#news_nav').append('<div id="news_nav_img"><img src="'+site.cdn+'/images/news_header.png"></div>');
                    $('#news_nav').append('<div type="right" class="news_article_btn fa fa-arrow-circle-right" ></div>');
                    $('#news_nav').append('<div type="close" class="news_article_btn fa fa-times" ></div>');
                    $('#news_nav').append('<div type="left" class="news_article_btn fa fa-arrow-circle-left" ></div>');

                    $('.news_article_btn').click(function(event){
                        var type = $(this).attr('type');
                        thisobj.nav(type);
                    });


                    $('#news_overlay').append('<div id="news_article"></div>');

                    $('#news_overlay').append('<div class="news_article_video"></div>');

                    site.trace("this.data[i].type = "+this.data[i].type)
                    if(this.data[i].type == "youtube") $('#news_overlay').find('.news_article_video').append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+this.data[i].video_id+'?rel=0" frameborder="0" allowfullscreen></iframe>');

                    if(this.data[i].type == "vimeo") $('#news_overlay').find('.news_article_video').append('<iframe src="https://player.vimeo.com/video/'+this.data[i].video_id+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                    $('#news_article').append('<div id="news_article_img"></div>');

                    var new_content = new Image();  
                    new_content.id = i;
                    new_content.onload = function () {   

                        thisobj.img_loaded(this.id);

                    } 

                    var img = this.data[i].img['sizes']['news-display'];

                    $('#news_article_img').append('<img src="'+img+'">');

                    $('#news_article').append('<span id="news_article_top"></span>');
                    $('#news_article_top').append('<span class="news_article_title">'+this.data[i].title+'</span>');
                    
                    $('#news_article_top').append('<div class="news_share">Share: </div>');


                    $('#news_article_top .news_share').append('<div entryid="'+this.data[i].id+'" type="facebook" class="news_share_btn"><span class="fa fa-facebook" aria-hidden="true" ></span><span class="screen-reader-text">Facebook</span></div>');

                    $('#news_article_top .news_share').append('<div entryid="'+this.data[i].id+'" type="twitter" class="news_share_btn"><span class="fa fa-twitter" aria-hidden="true" ></span><span class="screen-reader-text">Twitter</span></div>');

                    $('#news_article_top .news_share').append('<div entryid="'+this.data[i].id+'" type="google" class="news_share_btn"><span class="fa fa-google" aria-hidden="true" ></span><span class="screen-reader-text">Google</span></div>');

                    $('#news_article_top .news_share').append('<div entryid="'+this.data[i].id+'" type="pinterest" class="news_share_btn"><span class="fa fa-pinterest" aria-hidden="true" ></span><span class="screen-reader-text">Pinterest</span></div>');

                    $('#news_article_top .news_share').append('<div entryid="'+this.data[i].id+'" type="tumblr" class="news_share_btn"><span class="fa fa-tumblr" aria-hidden="true" ></span><span class="screen-reader-text">Tumblr</span></div>');

                     $('.news_share_btn').click(function(event){
                        var type = $(this).attr('type');
                        var id = $(this).attr('entryid');
                        thisobj.share_article(type,id);
                    });
                    
                    if(site.device == "desktop") {
                        $('.news_share_btn').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#d90e0e", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('.news_share_btn').mouseleave(function (event){  
                            TweenMax.to($( this ), .5, {color:"#000", ease:"Power1.easeInOut", overwrite:2}); 
                        });      
                    }

                    $('#news_article').append('<span class="news_article_desc">'+this.data[i].desc+'</span>');

         


                    if(site.device == "desktop") {
                        $('.news_article_btn').mouseenter(function (event){  
                           TweenMax.to($( this ), .25, {color:"#d90e0e", ease:"Power1.easeInOut", overwrite:2}); 
                        });

                        $('.news_article_btn').mouseleave(function (event){  
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

        this.article_open = false;

        TweenMax.to($('#news_overlay'), .5, {height:0, ease:"Power1.easeInOut", onComplete:this.reset_article, onCompleteScope:this, overwrite:2}); 
    },

    reset_article : function () {
        $('#news_overlay').remove();
    },

    share_article : function (type, id) {
        
        site.trace("share_article type = "+type+" id = "+id);

        var i;
        for (i = 0; i < this.data.length; i++) {
            if(this.data[i].id == id) {
                var url = site.site_url+"/"+this.id+"/"+this.data[i].id;
                var img = this.data[i].img['sizes']['share'];
                var desc = this.data[i].title + " " +this.data[i].bio;   

                site.share(type,id,url,img,desc);
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

        if(this.data[this.new].ext_link != "") {
            this.nav(type);
            return;
        } 

        TweenMax.delayedCall(.55, thisobj.open_article, [this.data[this.new].id], this);
    },

    img_loaded : function (val) {

        this.article_open = true;

        TweenMax.to($('#news_overlay'), .5, {height:site.window_height(), ease:"Power1.easeInOut", overwrite:2}); 

    },

    set_btns : function () {

        var thisobj = this;


        $('#news_holder a').click(function(event){
            event.preventDefault();
            var id = $(this).attr('entry_id');
            var target = $(this).attr('target');
            var href = $(this).attr('href');
            site.trace("target = "+target)
            if(target == "_blank") {
                window.open(href,"_blank");
                return
            }
            thisobj.open_article(id);
        });


        if(site.device == "desktop") {
            $('.news_read_more').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#fff", backgroundColor:'#d90e0e', ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('.news_read_more').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#fff", backgroundColor:'#000', ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }
        

    },
         
    resize : function () {

        site.trace("resize");

        var thisobj = this;

        if(site.device == "mobile") {

            if(this.device_state != "mobile") {
                this.set_articles();
            }
            this.device_state = "mobile";    
            
        } else {
            if(this.device_state != "desktop") {
                this.set_articles();
            }
            this.device_state = "desktop";       
        }

            

        $('.news_entry').css({
            "width":this.news_img_w()+"px",
            "margin":this.news_entry_tb()+"px "+this.news_entry_lr()+"px"
            });


        var entry_count = 0;

        site.trace("this.news_set.length = "+this.news_set.length);

        for (i = 0; i < this.news_set.length; i++) {
            
            site.trace("=========      this.news_set[i] = "+this.news_set[i])

            var entry_l = (this.news_entry_lr() + this.news_img_w()) * entry_count;
            
            site.trace("entry_l = "+entry_l);

            TweenMax.to($('#'+this.data[this.news_set[i]].id), .5, {left:entry_l+"px", top:this.news_entry_tb()+"px", opacity:1, ease:"Power1.easeInOut", overwrite:2}); 
            
            entry_count++;

        }

            
    },

    news_img_w : function () {
        var value = 400 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .77;
        return value;
    }, 
    news_entry_tb : function () {
        var value = 10 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .01;
        return value;
    }, 

    news_entry_lr : function () {
        var value = 55 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    }, 

};
