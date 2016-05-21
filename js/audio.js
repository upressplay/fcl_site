
$(document).ready(function(){  

    site.audio.initialize();
    
}); 

site.audio = {
    id:"audio",
    sounds:[],
    audio_on:false,
    active:"",
    current:0,
    active_clr:"#d90e0e",
    inactive_clr:"#fff",
    active_title_clr:"#fff",
    inactive_title_clr:"#000",
    initialize : function () {

        this.render();
        
    },
    render : function () {

        var thisobj = this;

        this.sounds.push({id:'background', mp3:site.cdn+'audio/background.mp3', ogg:site.cdn+'audio/background.ogg',loaded:false});

        this.sounds = site.soundtrack_data;

        this.audio_setting()

        var i;
        for (i=0;i<this.sounds.length;i++)
        { 
            $('#'+this.sounds[i].id+"_play_btn").click(function(event){
                var id = $(this).attr('btnid');
                thisobj.play(id);
            });  

            $('#'+this.sounds[i].id+"_stop_btn").click(function(event){
                thisobj.stop();
            });   
        }

        

        site.trace(this.id+" render this.sounds.length = "+this.sounds.length)
        
    },

    load : function (id,play_now) {


        if(!this.audio_on) return;
        site.trace(">>>>>>>>>>> load_sound id = "+id+" play_now = "+play_now)
        
        var i;
        var thisobj = this;

        for (i=0;i<this.sounds.length;i++)
        {      
            //alert("this.sounds[i].id = "+this.sounds[i].id)
            if(this.sounds[i].id == id && !this.sounds[i].loaded) {   
                audio = document.createElement("audio"); 
            
                audio.id = this.sounds[i].id;   
            
                var canPlayType = audio.canPlayType("audio/mpeg");    
            
                //site.trace("audio.id ="+audio.id+" canPlayType = "+canPlayType) 
            
                if(canPlayType == true || canPlayType == "true" || canPlayType == "maybe" || canPlayType == "probably"){
                    audio.src = this.sounds[i].mp3;
                    audio.type = "audio/mpeg";  
                } else {
                    audio.src = this.sounds[i].ogg;
                    audio.type = "audio/ogg"; 
                }
                
                audio.onended = function() {
                    thisobj.audio_ended();
                };

                //site.trace("audio.src  = "+audio.src);
                this.sounds[i].obj = audio;   
                this.sounds[i].loaded = true;
                if(play_now) this.play(id); 
                
                return;
            }  
        }
     

        //SITE.trace("audio.src  = "+audio.src);
    },
    audio_ended : function () {
        site.trace("audio_ended")
        this.play_next();
    },
    play_next : function () {
        site.trace("play_next")

        var i;
        var next = this.current + 1;
        if(next > this.sounds.length-1) next = 0;
        this.play(this.sounds[next].id);
    
    },

    play : function (id) {

        if(!this.audio_on) return;
        site.trace('')
        site.trace("play id = "+id)

        site.trace("this.active = "+this.active)
        if(id == this.active) {
            this.stop();
            return;
        }

        if(this.active != '')
        var i;
        for (i=0;i<this.sounds.length;i++)
        {          
            site.trace("this.sounds[i].id = "+this.sounds[i].id+" this.sounds[i].playing = "+this.sounds[i].playing)
            if(this.sounds[i].playing) {
                this.sounds[i].obj.pause();  
                this.sounds[i].playing = false;    
            }
            if (this.sounds[i].id == id) {          
               site.trace("this.sounds[i].loaded = "+this.sounds[i].loaded) 
                if(this.sounds[i].loaded) {
                    this.sounds[i].playing = true;
                    this.sounds[i].obj.play();  
                    
                    this.active = this.sounds[i].id;
                    TweenMax.killDelayedCallsTo(this.back_btn);
                    TweenMax.delayedCall(.5, this.set_current_time, [i], this);
                    this.current = i;

                    
                    this.track_active(i);
                } else {
                    this.load(id,true);
                }
            } else {
                this.track_inactive(i);
            }
        } 
             

        //SITE.trace("audio.src  = "+audio.src);
    },
    set_current_time : function (val) {

        this.sounds[val].obj.currentTime = 0;

    },
    track_active : function (i) {


        TweenMax.to($('#'+this.sounds[i].id), .5, {backgroundColor:this.active_clr, ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($('#'+this.sounds[i].id).find('.soundtrack_title'), .5, {color:this.active_title_clr, ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($('#'+this.sounds[i].id).find('.soundtrack_artist'), .5, {color:this.active_title_clr, ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($('#'+this.sounds[i].id).find('.soundtrack_link'), .5, {color:this.active_title_clr, ease:"Power1.easeInOut", overwrite:2}); 


        TweenMax.to($('#'+this.sounds[i].id+'_play_btn'), .5, {opacity:0, onComplete:site.div_display, onCompleteParams:['#'+this.sounds[i].id+'_play_btn','none'], ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($('#'+this.sounds[i].id+'_stop_btn'), .5, {delay:.5, opacity:1, onStart:site.div_display, onStartParams:['#'+this.sounds[i].id+'_stop_btn','inline-block'], ease:"Power1.easeInOut", overwrite:2}); 




    },

    track_inactive : function (i) {

        TweenMax.to($('#'+this.sounds[i].id), .5, {backgroundColor:this.inactive_clr, ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($('#'+this.sounds[i].id).find('.soundtrack_title'), .5, {color:this.inactive_title_clr, ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($('#'+this.sounds[i].id).find('.soundtrack_artist'), .5, {color:this.inactive_title_clr, ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($('#'+this.sounds[i].id).find('.soundtrack_link'), .5, {color:this.inactive_title_clr, ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($('#'+this.sounds[i].id+'_stop_btn'), .5, {opacity:0, onComplete:site.div_display, onCompleteParams:['#'+this.sounds[i].id+'_stop_btn','none'], ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($('#'+this.sounds[i].id+'_play_btn'), .5, {delay:.5, opacity:1, onStart:site.div_display, onStartParams:['#'+this.sounds[i].id+'_play_btn','inline-block'], ease:"Power1.easeInOut", overwrite:2}); 

    },

    stop : function() {

        site.trace("audio stop")
        var i;
        for (i=0;i<this.sounds.length;i++)
        {          
            //site.trace("this.sounds[i].id = "+this.sounds[i].id)
            if (this.sounds[i].id == this.active) {          
                this.sounds[i].obj.pause();  
                this.sounds[i].playing = false;
                this.active = "";
                this.track_inactive(i);
                
                return;
            }
        }    
    },

    check_audio : function () {
        var audio_cookie = site.read_cookie("audio_on");
        if(audio_cookie == true || audio_cookie == "true") this.audio_on = true;
        if(audio_cookie == false || audio_cookie == "false") this.audio_on = false;
        site.trace("audio_cookie = "+audio_cookie+" this.audio_on = "+this.audio_on)
        this.set_audio_btn();
    },
    set_audio_btn : function () {
        if(this.audio_on) {
            $('#audio_btn .on').css({
                "display":"block"
                });

            $('#audio_btn .off').css({
                "display":"none"
                });
        } else {
            $('#audio_btn .on').css({
                "display":"none"
                });

            $('#audio_btn .off').css({
                "display":"block"
                });

        }
    },

    audio_setting : function () {
        var i;
        if(this.audio_on) {
            this.audio_on = false;
            for (i=0;i<this.sounds.length;i++)
            {          
                if(this.sounds[i].loaded) {
                    this.sounds[i].obj.pause();
                    this.sounds[i].playing = false;
                }   
            } 
            site.set_storage("audio_on","false",7);
        } else {
            this.audio_on = true;
            for (i=0;i<this.sounds.length;i++)
            {          
                if (this.sounds[i].id == this.active) {      
                    this.sounds[i].obj.play();
                    this.sounds[i].playing = true;
                }   
            } 
            site.set_storage("audio_on","true",7);
        }

        this.set_audio_btn();
        
    },

   


};