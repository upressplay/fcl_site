$(document).ready(function(){  

	site.instagram.initialize();

}); 

site.instagram = {
    instagram_data:[],
    client_id:'518317687f144d9cb634b6b005b800e1',
    instagram_user:'firstcomeslike',
    max_entries:10,
	initialize : function () {

		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("home render");


    	this.resize();

        this.get_instagram();
  
    },

    
    
    get_instagram : function () {

       var thisobj = this;

        site.trace("get_instagram")

        var instagram_url = 'https://api.instagram.com/v1/users/search?q='+this.instagram_user+'&client_id='+this.client_id;
        
        $.ajax({
            method: "GET",
            url: instagram_url,
            dataType: "jsonp",
            success: function(data) {
                var string = JSON.stringify(data); 
                //site.trace("get_instagram string = "+string)   
                var i;
        
                for (i = 0; i < data.data.length; i++) {

                    if(thisobj.instagram_user == data.data[i].username) thisobj.get_instagram_data(data.data[i].id);
                    //site.trace("get_instagram data.data.username = "+data.data[i].username)    
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                site.trace("errror")
            }
        });
    },

    get_instagram_data : function (id) {

        var thisobj = this;

        site.trace("get_instagram_data")

        var instagram_url = 'https://api.instagram.com/v1/users/'+id+'/media/recent/?client_id='+this.client_id+'&count=24';
        
        $.ajax({
            method: "GET",
            url: instagram_url,
            dataType: "jsonp",
            success: function(data) {
                var string = JSON.stringify(data); 
                thisobj.instagram_data = data.data;
                thisobj.build_instagram_posts();
                //site.trace("get_instagram_data data = "+string)    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                site.trace("errror")
            }
        });
    },

    build_instagram_posts : function () {

        //site.trace("build_instagram_posts")

        if(this.instagram_data.length < 10) this.max_entries = 5;
        var i;
        
        for (i = 0; i < this.instagram_data.length; i++) {

            if(i < this.max_entries) {

                
                site.trace("this.instagram_data.data[i].id = "+this.instagram_data[i].images.low_resolution.url)  

                $('#instagram').append('<div id="'+i+'_grid" class="instagram_grid"></div>'); 

                this.build_instagram_post(i, i);
                
            } else {
                this.instagram_data[i].open = false;      
            }

            
        }

        this.resize();
        TweenMax.delayedCall(3, this.rotate_instagram, [], this);
    },

    rotate_instagram : function () {

        //site.trace("rotate_instagram")
        var i;

        var grid_to_replace = Math.floor((Math.random() * this.max_entries-1) + 1);

        //site.trace("grid_to_replace = "+grid_to_replace);

        var closed_entries = [];
        
        for (i = 0; i < this.instagram_data.length; i++) {

            if(!this.instagram_data[i].open) {
                //site.trace("closed_entries push i = "+i)
                closed_entries.push(i);
            }
            
        }

        //site.trace("closed_entries.length = "+closed_entries.length)

        var new_grid = Math.floor((Math.random() * closed_entries.length-1) + 1); 

        //site.trace("new_grid = "+new_grid);

        var new_grid_id = closed_entries[new_grid];

        //site.trace("new_grid_id = "+new_grid_id);


        TweenMax.delayedCall(3.5, this.rotate_instagram, [], this);

        var replacement_id = $('#'+grid_to_replace+'_grid').find('.instagram_entry').attr('entry_id');

        //site.trace("replacement_id = "+replacement_id)
        this.instagram_data[replacement_id].open = false;

        TweenMax.to($('#'+grid_to_replace+'_grid').find('.instagram_entry'), 1, {opacity:0, ease:"Power1.easeInOut", onComplete:this.build_instagram_post, onCompleteParams:[grid_to_replace, new_grid_id], onCompleteScope:this, overwrite:2}); 
        
        this.resize();
    },

    build_instagram_post : function (grid, val) {

        //site.trace("build_instagram_post grid = "+grid+" val = "+val)
        $('#'+grid+'_grid').html('');  
        $('#'+grid+'_grid').append('<a href="'+this.instagram_data[val].link+'" target="_blank"><div entry_id="'+val+'"" class="instagram_entry"></div></a>');  
        $('#'+grid+'_grid').find('.instagram_entry').append('<img src="'+this.instagram_data[val].images.low_resolution.url+'">');  

         $('.instagram_grid').css({
            "float":"left",
            });

         $('.instagram_entry').css({
            "width":"100%",
            "height":"100%",
            });

         $('.instagram_entry img').css({
            "width":"100%",
            "height":"auto"
            });    

         this.instagram_data[val].open = true;
         TweenMax.from($('#'+grid+'_grid').find('.instagram_entry'), 1, {opacity:0, ease:"Power1.easeInOut", overwrite:2}); 

         this.resize();
    },

    resize : function () {

    	
		if(site.device == "mobile") {

		} else {
 
		}

       $('.instagram_grid').css({
            "width":this.instagram_entry_w(),
            });



    },


    instagram_entry_w : function () {
        var value = 100 / 5 +"%";
        if(site.device == "mobile") value = 100 / 3 +"%";
        return value;
    },

    instagram_entry_m : function () {
        var value = 5 * site.scale();
        if(site.device == "mobile") value = site.window_width() * .01;
        return value;
    },


};
