
var site = {
	max_width:1600,
	mobile_width: 900,
	tracking: true,
	debugging:true,
    testing:false,
	cdn:"",
	site_url:"",
    meta_title:"",
    meta_desc:"",
    device:"",
    share_hash:"RockBox",
    user_agent:"",
    segments:[],
    pin:'',
    twitter_t:'',
	initialize : function () {

        site.trace("site initialize");

        this.user_agent = navigator.appName;

        this.device_detect();

        this.site_url = window.location.hostname;

        if(this.query_string('debug_site') == "true") this.debugging = true;
        
        this.trace("this.site_url = "+this.site_url)
        this.trace("this.cdn = "+this.cdn)
        
        this.get_segments();


        this.render();
	    
    },



    render : function () {

    	var thisobj = this;

    	site.trace("site render");

        $('#site_holder').css({
            "display":"block"
            });

        TweenMax.set($('#site_holder'), {opacity:0}); 

        $( window ).resize(function() { thisobj.resize(); });

        site.trace("site.device = "+site.device+" site.window_width() = "+site.window_width())

        TweenMax.to($('#site_holder'), .5, {opacity:1, overwrite:2}); 

        

        
    	this.resize();
        
    },


    trace : function (val, key) {
    	if(this.debugging && window.console) console.log(val);  
    },

    pixel_depth : function () {
        var value = window.screen.pixelDepth;
        return value;
    },

    device_detect : function () {

        //site.trace("device_detect")

        var pixelDepth = this.pixel_depth();
        var width = this.window_width();
        var height = this.window_height();
        var isTouchDevice = 'ontouchstart' in document.documentElement;


        if ( this.window_width() < site.mobile_width ) {

            site.trace('mobile on desktop');

            return this.device = 'mobile'
        }

        if ( this.window_width() > site.mobile_width ) {

            site.trace('desktop, this.window_width() > site.mobile_width');

            return this.device = 'desktop'
        }

        if ( this.window_width() > site.mobile_width && pixelDepth == 24 ) {

            site.trace('desktop, this.window_width() > site.mobile_width && pixelDepth == 24');

            return this.device = 'desktop'
        }

        if( pixelDepth == 24 && isTouchDevice == false ){

            site.trace('desktop, pixelDepth == 24 && isTouchDevice == false');

            return this.device = 'desktop';

        } 
        if ( pixelDepth == 32 && isTouchDevice == true && width >= 768 ) {

            site.trace('tablet');

            return this.device = 'tablet';

        }
        if ( pixelDepth == 32 && isTouchDevice == true && height == 628 || height == 414 ) {

            site.trace('iphone 6+');

            return this.device = 'iphone 6+';

        }
        if ( pixelDepth == 32 && isTouchDevice == true ) {

            site.trace('mobile');

            return this.device = 'mobile';

        }

    },
        
    resize : function () {

        this.device_detect();
    	
		if(site.device == "mobile") {

		} else {

		}

        $('html').css({
            "font-size":this.size()+"px"
        });
    
        
    },

    window_width : function () {
    	var value = Math.round($('#site_holder').innerWidth());
    	//if(value < this.max_width) value = value - 10;
    	return value;
    },
    window_height : function () {
    	var value = Math.round($('#site_holder').innerHeight());
    	return value;
    },

    size: function () {
        var value = 10 * site.scale();
        //if(site.device == "mobile") value = site.window_width() * .01;
        return value;
    },

    scale : function () {
    	var value = this.window_width()/this.max_width;
    	//if(value > 1) value = 1;
        //if(site.device == "mobile") value = 1;
        if(site.device == "mobile") value = this.window_width()/this.mobile_width;
    	return value;
    },
    width : function () {
    	var value = this.max_width * this.scale();
    	return value;
    },
    height : function () {
    	var value = $('#site_container').innerHeight();
    	return value;
    },

    min_height : function () {
    	var value = 700 * this.scale();
    	return value;
    },

    top : function () {
        var value = $( "#site_holder" ).scrollTop();
        return value;
    },

    track : function (options) {

        this.trace("------------------------------------------")      
    	this.trace("track this.tracking = "+this.tracking)           
		this.trace("------------------------------------------")      
        if(!this.tracking) return;

        site.trace(JSON.stringify(options))

        for (var prop in options) {
          this.trace("options." + prop + " = " + options[prop]);
        }

        dataLayer.push(options);

		
    },

    set_storage : function (name,value,exdays)
    {
        localStorage.setItem(name, value);
    },

    get_storage : function(name){
        var value = localStorage.getItem(name);
        return value;
    }, 

    query_string: function (name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },

    get_segments : function () {

        //site.trace("get_segments")
        this.segments = window.location.pathname.split( '/' );   
        //site.trace("this.segments.length = "+this.segments.length)
        var i;

        for (i = 0; i < this.segments.length; i++) {
            //site.trace( "this.segments[i] = "+this.segments[i] )
        }
    },

    set_url : function (seg1,seg2,seg3,title,desc,img) {

        if (!history.pushState) return;
        var url = "/"+seg1;
        if(seg2 != undefined && seg2 != "") url = url + "/" + seg2;
        if(seg3 != undefined && seg3 != "") url = url + "/" + seg3;

        history.pushState(null, null, url);

        site.trace("set_url seg1 = "+seg1+" seg2 = "+seg2+" seg3 = "+seg3);


        this.get_segments();

        
    },

    share : function (type, id, url, img, desc) {
    	site.trace("share type = "+type+" id = "+id+" url = "+url+" img = "+img+" desc = "+desc)

    	var title = "Ready to rock? From April 4 to May 22 you can win a RockBox every time you dine at Hard Rock Cafe. Though some boxes are more epic than others, all winners will have the chance to jet around the world to the a Hard Rock destination of their choice.  ";

        if(desc == "" || desc == undefined || desc == null) desc = title;

        desc = desc.replace(/(<([^>]+)>)/ig,"").replace(/”/g,"").replace(/“/g,"");

        if(type == "like") {
            site.trace("liked");
        }

        if(type == "reblog") {
            site.trace("reblogged");
            var reblog_url = ' https://www.tumblr.com/reblog/'+id;
            //119552612740
            window.open(reblog_url, "_self");

        }

        if(type == "instagram") {
            site.trace("instagram");
        }

	    if(type == "facebook") {
	    	var share_url = url;
	    	share_url = encodeURIComponent(share_url);
	    	var network_url = "https://www.facebook.com/sharer/sharer.php?u="+share_url;
	    	window.open(network_url, "facebook_share", "width=600, height=400");
	    }

	    if(type == "twitter") {
	    	var share_txt = desc;
            var share_url = url;
            site.trace('twitter share_url ========= '+share_url)
	    	//share_url = encodeURIComponent(share_url);

            var character_max = 240;
            var characters_over = 0;
            var message_string = share_txt + " " +share_url+ " " + this.share_hash;
            if(message_string.length > character_max) {
                characters_over = message_string.length - character_max + 3;
                share_txt = share_txt.substring(0, share_txt.length - characters_over);
                share_txt = share_txt + "...";
                site.trace("share_txt = "+share_txt+" characters_over = "+characters_over+" message_string.length = "+message_string.length)
                //share_txt = encodeURIComponent(share_txt);
            }
            site.trace('twitter share_url ========= '+share_url)
	    	var network_url = "http://twitter.com/share?text="+share_txt+"&url="+share_url;
            site.trace('twitter network_url ========= '+network_url)
            //network_url = encodeURIComponent(network_url);
	    	window.open(network_url, "twitter_share", "width=600, height=400");
	    }

	    if(type == "google") {
	    	var share_url = url;
	    	share_url = encodeURIComponent(share_url);
	    	var network_url = "https://plus.google.com/share?url="+share_url;
	    	window.open(network_url, "google_share", "width=600, height=600");
	    }

	    if(type == "pintrest") {
            var share_txt = desc;
	    	var share_url = url;
	    	site.trace("share_url = "+share_url)
	    	share_url = encodeURIComponent(share_url);
            var network_url = "http://pinterest.com/pin/create/button/?url="+share_url+"&description="+share_txt+"&media="+img;
	    	window.open(network_url, "pintrest_share", "width=600, height=600");
	    }


        site.track({"share":type,"id":id, "event":"share_post"});
    },

    div_display : function (id,display) {
        //site.trace("div_display id = "+id+" display = "+display)
        $(id).css({
            "display":display
            });
    },

    div_remove : function (id) {
        site.trace("div_remove id = "+id)
        $(id).remove();
    },

    linkify : function (text,target) {  
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;  
        return text.replace(urlRegex, function(url) {  
                return '<a href="' + url + '" target="'+target+'">' + url + '</a>';  
            })  
    },

    scroll_to :function (val) {
        
        site.trace("scroll_to val = "+val);

        var this_position = $( val ).position();
        this_position = this_position.top;
        site.trace("this_position = "+this_position)
        var current_scroll = $( '#site_holder' ).scrollTop(  );

        var final_scroll = this_position + current_scroll - ($('nav').height() * 1);
        TweenMax.to($( '#site_holder' ), 1, {delay:.5, scrollTo:{y:final_scroll}, ease:"Power2.easeOut"});

    },

    validate_zip : function (val) {
        var value =/^[0-9]{5}(?:-[0-9]{4})?$/.test(val);
        if(val.length < 5) value = false;
        return value;
    },

    
    external_link : function ( href, target, id ) {
        //if(site.audio.audio_on) site.audio.audio_setting();
        this.track({id:id,url:href,event:'external_link'})
        window.open(href,target);
    }

};
$(document).ready(function(){  

    site.initialize();
    
}); 
