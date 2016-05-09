$(document).ready(function(){  

    site.services.initialize();
    
}); 

site.services = {

    id:"services",
    data:[],
    current:-1,
    new:0,
    initialize : function () {

        var thisobj = this;

        $( window ).resize(function() { thisobj.resize(); });

        this.data.push({icon:"train", title:"temporary staffing°", desc:"6 Degrees provides organizations with highly skilled finance and accounting professionals on a temporary and temporary-to-hire basis. From an office assistant, to an interim controller, we can fill your vacancy with a talented person, today. ", expand:"FINANCIAL MANAGEMENT: Financial and SEC Reporting. Budgeting, Planning, and Forecasting. IFRS / Convergence Financial Analysis.Audit and Governance. (Information Technology, Operational, and Financial) Domestic, International, and State / Local Tax Compliance.Business Process Improvement. Cost Accounting"});

        this.data.push({icon:"suitcase", title:"executive recruiting°", desc:"Since 2006, 6 degrees has emphasized quality in the recruiting process, and made a name for itself as Chicago’s premier permanent financial hiring solution. Our staff of CPA’s and Accountants will match top tier talent with your staffing need.  We listen. We save time, and increase productivity.", expand:"Clerical and general accounting: Accounts Payable, Accounts Receivable, General Ledger, Financial Statement Preparation, Credit and Collections, Bookkeeping. Office and Administrative: Executive Administration, Customer Service, Data Entry, Human Resources Assistance, Billing, Office Clerical, Receptionist"});

        this.data.push({icon:"rocket", title:"retained search°", desc:"When time and confidentiality are crucial, retained search is the answer.  Retaining 6 degrees is appropriate when the need is urgent, and the vacancy must be quickly addressed with a highly demanded skillset.  Retained search sends a strong message that the hiring authority is fully engaged and committed to making the right hire. ", expand:"Accounts Payable, Accounts Receivable, Audit, Financial Analysis, Staff and Senior Accounting, Tax, Managerial Accounting, Financial Planning and Analysis, Financial Reporting and Executive Financial Management. "});

        this.data.push({icon:"wrench", title:"consulting°", desc:"6 Degrees provides organizations with skilled senior-level accounting, finance and business systems professionals on a project basis. We can find your ace in the areas of:  Financial Planning Analysis, financial reporting, business Process engineering, Financial optimization, and Risk / Compliance and information technology.", expand:"Entry, Mid and C level financial management: Tax, Audit, Analysis, Reporting, Treasury, Risk, "});

        this.render();


    },

    render : function () {

        site.trace(this.id+" render");

        var thisobj = this;

        $('.service_btn').click(function (event){  
            var id = $(this).attr('btnid');
            thisobj.open(id);
            }); 
        
       
        this.resize();

    },

    

    open : function (id) {

        site.trace("open id = "+id)
        this.new = id;
        if(this.new == this.current) {
            site.trace('close')
            TweenMax.to($('#service_'+this.new).find('.service_initial'), 1, {marginLeft:"0%", ease:"Power1.easeInOut", overwrite:2}); 
            this.current = -1;
            return;
        } else {
            site.trace('open')
            TweenMax.to($('#service_'+this.current).find('.service_initial'), 1, {marginLeft:"0%", ease:"Power1.easeIn", overwrite:2}); 
            TweenMax.to($('#service_'+this.new).find('.service_initial'), 1, {marginLeft:"-100%", ease:"Power1.easeIn", overwrite:2}); 
            this.current = this.new;
        }
        

        
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


