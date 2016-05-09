$(document).ready(function(){  

    site.apply.initialize();
    
}); 

site.apply = {

    id:"apply",
    data:[],
    current:-1,
    new:0,
    loading:false,
    initialize : function () {

        var thisobj = this;

        $( window ).resize(function() { thisobj.resize(); });

        this.data = site.position_data;

        this.render();


    },

    render : function () {

        site.trace(this.id+" render");

        var thisobj = this;


        this.next();
       
        this.resize();

    },

    next : function () {

        //site.trace(this.id+" load");

        var thisobj = this;

        this.new = this.current + 1;
        if(this.new > this.data.length-1) this.new = 0;


        TweenMax.to($('#position_'+this.new), .5, {delay:.5, opacity:1, onStart:site.div_display, onStartParams:['#position_'+this.new, 'block'], ease:"Power1.easeInOut", overwrite:2}); 
        TweenMax.to($('#position_'+this.current), .5, {opacity:0, onComplete:site.div_display, onCompleteParams:['#position_'+this.current, 'none'], ease:"Power1.easeInOut", overwrite:2}); 

        this.current = this.new;

        if(this.data.length > 1) TweenMax.delayedCall(3.5, this.next, [], this);

    },

    
    resize : function () {

        if(site.device == "mobile") {
            
            
        } else {
            
        }


        

        
    },

    
};


