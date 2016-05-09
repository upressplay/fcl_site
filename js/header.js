$(document).ready(function(){  

    site.header.initialize();
    
}); 

site.header = {

    id:"header",
    data:[],
    current:-1,
    new:0,
    loading:false,
    initialize : function () {

        var thisobj = this;

        $( window ).resize(function() { thisobj.resize(); });

        this.data.push({img:"/images/header_01.jpg", loaded:false});

        this.render();


    },

    render : function () {

        site.trace(this.id+" render");

        var thisobj = this;

        this.load();

        

        $('#header_btn').click(function(event){
            var id = $(this).attr('entryid');
            site.videos.open_videos(id);
        });

        if(site.device == "desktop") {
            $('#header_btn').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#d90e0e", ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('#header_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#FFF", ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }
       
        this.resize();

    },

    load : function () {

        //site.trace(this.id+" load");

        var thisobj = this;

        this.new = this.current + 1;
        if(this.new > this.data.length-1) this.new = 0;

        if(this.data[this.new].loaded) {
            this.img_loaded();
            return;
        }

        var photo_url = site.cdn+this.data[this.new].img;
        var new_img = new Image();  
        new_img.onload = function () {   
            thisobj.img_loaded();
        }

        $('#header_anim').append('<div id="header_anim_'+this.new+'" class="header_anim"><img src="'+photo_url+'"></div>');

        TweenMax.set($('#header_anim_'+this.new), {opacity:0}); 


        new_img.src = photo_url;

    },

    img_loaded : function () {

        this.data[this.new].loaded = true;

        //site.trace(this.id+" img_loaded");
        TweenMax.to($('#header_anim_'+this.new), 1, {opacity:1, ease:"Power1.easeInOut", overwrite:2}); 
        TweenMax.to($('#header_anim_'+this.current), 1, {opacity:0, ease:"Power1.easeInOut", overwrite:2}); 
        this.current = this.new;

        if(this.data.length > 1) TweenMax.delayedCall(3.5, this.load, [], this);
    },

    
    resize : function () {

        if(site.device == "mobile") {
            
            
        } else {
            
        }


        

        
    },

    prizes_holder_w : function () {
        var value = 1400 * site.scale();
        if(site.device == "mobile") value = site.window_width() * 1;
        return value;
    },

   

    
    
    
};


