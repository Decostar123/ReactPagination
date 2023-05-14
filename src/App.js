
import './App.css';
import {useEffect , useState } from "react" ; 
function App() {
  const [product , setProducts ] = useState([]) ; 
  const [page , setPage ] = useState( 1) ; 
  const [totalPages , setTotalPages] = useState(0) ; 

  const selectPageRender = (ind)=>{
    setPage(ind) ; 
  }
  const fetchProducts = async ()=>{
    // ${(page-1)*10 }
    const res  = await  fetch( `https://dummyjson.com/products?limit=10&skip=${page*10 - 10 }`) ; 
    const data = await res.json() ; 
    console.log( data ) ; 
    if( data && data.products )
    {
      setProducts( data.products  ) ; 
      setTotalPages( data.total / 10 ) ; 
    }

  }
  useEffect( ()=>{
    fetchProducts() ; 
  } , [page] ) ; 
  return (
    <div >
    {
      product.length > 0 && <div className="products"> {

        product.map((ele)=>{
          return (<span key={ele.id} className="products__single"><img src={ele.images[1] } alt={ele.title} />
          
                   <span>{ele.title}</span>
                  </span>
                  
              )
        })
      }</div>
    }
    {product.length > 0 &&  <div className="pagination"> 
    <span onClick={()=>{
          selectPageRender( (page) =>{
            const next = page ===1 ? 1 : page-1 ; 
            return next  ; }
            ) 
        } } >👈</span>
    {
      [...Array(totalPages)].map( (ele,ind)=>{
        return <span onClick={()=>{
          selectPageRender(ind+ 1) 
        }} key={ind+1} className={page === ind+1 ? "pageSelected" :""}>  {ind+1}   </span>
      } ) 
    }
    <span onClick={()=>{
          selectPageRender( (page) =>{
            const next = page === totalPages   ? page : page + 1 ; 
            return next ; 
          }) 
        } }>👉</span>

    
    </div>}
      
    </div>
  );
}

export default App;
