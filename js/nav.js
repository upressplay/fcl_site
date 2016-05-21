$(document).ready(function(){  

    site.nav.initialize();
    
}); 

site.nav = {

    id:"nav",
    data:[],
    loading:false,
    open:false,
    scroll_urls:['/about/','/castcrew/','/gallery/', '/news/','/videos/', '/soundtrack/'],
    initialize : function () {

        var thisobj = this;

        $( window ).resize(function() { thisobj.resize(); });

        this.render();


    },

    render : function () {

        site.trace(this.id+" render");

        var thisobj = this;

        


        TweenMax.from($('nav'), 1, {top:"-15rem", overwrite:2}); 

        $('nav').css({
            "display":"block"
            });

        $( "nav a" ).add( "footer a" ).click(function( event ) {

            event.preventDefault();
            event.stopPropagation();  

            var href = $(this).attr('href');
            var target = $(this).attr('target');
            site.trace("href = "+href+" target = "+target);
            
            thisobj.nav_handler( href, target );
            

        });

 

        if(site.device !="desktop") {
            $('#nav_toggle').click(function (event){  
                thisobj.toggle();
            }); 
        }

        if(site.device == "desktop") {
            $('.img_btn').mouseenter(function (event){  
                TweenMax.to($( this ).find('.img_btn_rest'), .5, {opacity:0, ease:"Power1.easeInOut", overwrite:2}); 
                TweenMax.to($( this ).find('.img_btn_roll'), .5, {opacity:1, ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('.img_btn').mouseleave(function (event){  
                TweenMax.to($( this ).find('.img_btn_rest'), .5, {opacity:1, ease:"Power1.easeInOut", overwrite:2}); 
                TweenMax.to($( this ).find('.img_btn_roll'), .5, {opacity:0, ease:"Power1.easeInOut", overwrite:2}); 
            }); 

            $('.nav_btn').add('.social_btn').mouseenter(function (event){  
                TweenMax.to($( this ), .5, {color:'#d90e0e', ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('.nav_btn').add('.social_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:'#000', ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }

        $('#search_btn').click(function (event){  
            thisobj.search_positions();
            }); 

        site.trace("site.segments[1] = "+site.segments[1])
        if(site.segments[1] != undefined && site.segments[1] != "") site.scroll_to('#'+site.segments[1]);
        
        this.resize();

    },

    nav_handler : function (href, target) {

        var i;
        
        for (i = 0; i < this.scroll_urls.length; i++) {

            site.trace("nav_handler href = "+href+"this.scroll_urls[i] = "+this.scroll_urls[i]+" site.site_url = "+site.site_url)
            if(href == this.scroll_urls[i]) {


                href = href.replace('/','');
                href = href.replace('/','');
                this.btn_set_url(href);
                if(site.device == "mobile") this.toggle();
                return;
            }   
        }
        
        window.open(href,target);

        
    },

    search_positions : function () {
        var search_term = $('#search_position').val();
        site.trace("search_positions search_term = "+search_term);
        if(search_term != "" && search_term != undefined ) {
            search_term = encodeURIComponent(search_term);
            window.open( 'http://positions.6degreesinc.com/?search='+search_term, "_self" );
        }

    },

    btn_set_url : function (id) {

        site.trace("btn_set_url id = "+id)
        if(id == "") id = 'home';
        
        site.scroll_to('#'+id);
        if(id == "home") id = '';
        site.set_url(id)
    },

    toggle : function () {

        site.trace(this.id+" toggle this.open = "+this.open);

        if(this.open) {
            this.open = false;
            TweenMax.to($('#nav_btns_toggle'), .5, {height:'0px', ease:"Power1.easeInOut", overwrite:2}); 
        } else {
            this.open = true;
            TweenMax.to($('#nav_btns_toggle'), .5, {height:this.nav_height()+'px', ease:"Power1.easeInOut", overwrite:2}); 
        }

    },

    
    
    resize : function () {

        if(site.device == "mobile") {
            
            
        } else {
            
        }

        
    },

    nav_height : function () {
        var value = site.window_height() - $('#nav_toggle').height();
        return value;
    },

   

    
    
    
};


