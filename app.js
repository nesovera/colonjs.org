window.app = new Colon({
    el:'#app',
    data:{
        activeVersion:"v0",
        activePageSlug:"",
        activePage: { html: 'Loading...' },
        pageList:{
            v0: [
                { name:"Home", slug:"", file:"Home.html" },
                { name:"Installation", slug:"installation", file:"Installation.html" },
                { name:"Getting Started", slug:"getting-started", file:"GettingStarted.html" },
            ],
        },
    },
    created(){
        const path = window.location.pathname;
        this.data.activeVersion = path.split("/")[1] || this.data.activeVersion;
        this.data.activePageSlug = path.split("/")[2] || "";
        const activePage = this.methods.getActiveVersionPageList().find(v=>v.slug === this.data.activePageSlug);
        const activePageFile = "/"+this.data.activeVersion+'/'+activePage.file;
        fetch(activePageFile)
            .then(res=>res.text())
            .then(data=>{
                activePage.html = data;
                this.data.activePage = activePage;
                this.render();
            });
        hljs.configure({tabReplace: '  '});
    },
    methods:{
        getActiveVersionPageList(){
            return this.data.pageList[this.data.activeVersion];
        }
    },
    updated(){
        this.el.querySelectorAll('pre.hljs').forEach((block) => {
            block.innerHTML = block.innerHTML.replace(/^\s*\n/g,"").replace(/\n\s*$/g,"");
            hljs.highlightBlock(block);
        });
        this.el.querySelectorAll('script.run').forEach((block) => {
            eval(block.innerText);
        });
    }
});

window.footer = new Colon({ el:'footer' });