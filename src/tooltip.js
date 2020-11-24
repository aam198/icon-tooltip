
const template = document.createElement('template');
template.innerHTML=`


    <style>
        
        .tooltip-container{
            display: inline-block;
            position: relative;
            z-index: 2;
        }

        svg{
            width: 1em;
            cursor: pointer;
            }
        svg:hover{
            opacity: .8;
        }

        .close{
            display: none;
        }

        .notify-container{
            position: absolute;
            bottom: 120%;
            z-index: 8;
            min-width: 150px;
            background: white;
            box-shadow: 5px 5px 10px rgba(0,0,0,.2);
            font-size: .8em;
            border-radius: .5em;
            padding: 1em;
            transform: scale(0);
            transform-origin: bottom left;
            transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
        }
        
    </style>

    <html>

    <div class="tooltip-container">

        
        <svg class="alert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><defs><style>.a{fill:#fdd625;}</style></defs><path class="a" d="M17.32,18H2.68a3.16,3.16,0,0,1-.91-.2A2.82,2.82,0,0,1,.22,16.28a2.76,2.76,0,0,1,0-2.13L7.53,1.43a2.85,2.85,0,0,1,5,0l7.27,12.62a3.06,3.06,0,0,1,.25,1,2.79,2.79,0,0,1-.73,2A2.88,2.88,0,0,1,17.32,18ZM10,12.27A.88.88,0,0,0,9.94,14H10a.89.89,0,0,0,.87-.89A.87.87,0,0,0,10,12.27Zm0-6.18A.88.88,0,0,0,9.12,7v2.8a.9.9,0,0,0,.88.88.89.89,0,0,0,.87-.88V7A.86.86,0,0,0,10,6.09Z"/></svg>
        
        <svg class="close" viewBox="0 0 20 20"><defs><style>.b{fill:#e04b22;}</style></defs><path class="b" d="M14.34,20H5.67C2.28,20,0,17.62,0,14.09V5.92C0,2.38,2.28,0,5.67,0h8.67C17.73,0,20,2.38,20,5.92v8.17C20,17.62,17.73,20,14.34,20ZM10,11.23h0L11.78,13a.83.83,0,0,0,.61.26A.85.85,0,0,0,13,13a.87.87,0,0,0,0-1.23L11.23,10,13,8.21A.88.88,0,0,0,13,7a.87.87,0,0,0-.62-.25.9.9,0,0,0-.62.25L10,8.75,8.22,7a.9.9,0,0,0-.62-.25.88.88,0,0,0-.88.87A.94.94,0,0,0,7,8.21L8.76,10,7,11.76A.89.89,0,0,0,7,13a.9.9,0,0,0,.62.25A.85.85,0,0,0,8.22,13L10,11.23Z"/></svg>


        <div class="notify-container">
        
            <slot name="message" />
            Make a slot so users can update the text within the tooltip             
            
        </div>
        
    </div>

    </html>

`;


class Popup extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    tooltip(expandState){
        const tooltip = this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const close = this.shadowRoot.querySelector('.close');

        if (expandState == true){
            tooltip.style.transform = 'scale(1)';
            alert.style.display= 'none'; 
            close.style.display='block';
            expandState = false;
        }
        else {
            tooltip.style.transform ='scale(0)';
            close.style.display='none';  
            alert.style.display='block'; 
        }

    }

    

    
    connectedCallback(){
        this.shadowRoot.querySelector('.alert').addEventListener('click', () =>{
            this.tooltip(true) 
        })
        this.shadowRoot.querySelector('.close').addEventListener('click', () =>{
            this.tooltip(false)

        })
        
        
        if(this.getAttribute('pop_background')){
            this.shadowRoot.querySelector('.notify-container').style.background =this.getAttribute('pop_background')
        }
        
        if(this.getAttribute('pop_color')){
            this.shadowRoot.querySelector('.notify-container').style.color=this.getAttribute('pop_color')
        }
        if(this.getAttribute('pop_width')){
            this.shadowRoot.querySelector('.notify-container').style.width=this.getAttribute('pop_width')
        }
    }
}


window.customElements.define('icon-tooltip', Popup)