import axios from "axios"
import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate  } from "react-router-dom";
export default function Home() {
    // console.log("start");
    const [products, setProducts] = useState([])
    const[quantity,setQuantity]=useState(1)
    const getdata = async () => {
        await axios.get('http://localhost:3000/products').then(res => { setProducts(res.data); console.log(res, res.data) })
        // console.log(products)


    }
    useEffect(() => {
        getdata();

    }, [])
    const navigate=useNavigate();
    const [cartproduct, setCartproduct] = useState({
        id: "",
        title: "",
        price: "",
        image: "",
        quantity: 1
    })
    const addtocart = (e) => {
        const id =e.target.id.slice(3,);

        products.filter(product => {
            if (product.id == id) {
                console.log(product);
                setCartproduct(product);
                return product;
            }


        })
       
        // axios.put('http://localhost:3000/user/'+id,)

        console.log(cartproduct);

    }
    const Gotocart=()=>{
        navigate("/cart")
    }
    const incqty=()=>{
        const newcart={...cartproduct};
        newcart.quantity=cartproduct.quantity+1;
        setCartproduct(newcart)
    }
    const decqty=()=>{
        setCartproduct({...cartproduct,quantity:cartproduct.quantity-1})
    }
    
    const renderproducts = products.map((product) => {
        // console.log("abc")
        
        return (
            <div className="col-md-3 wrap p-2" key={product.id}>
                <img src={product.image} alt={product.title} className="img-fluid hover-zoom"></img>
                <h2>{product.title}</h2>
                <h3>₹{product.price}</h3>
                {/* <span>{product.quantity}</span> */}
                <button className="btn btn-warning cart-btn" onClick={addtocart} id={"atc" + product.id} data-bs-toggle="modal" data-bs-target="#exampleModal">add to cart</button>


            </div>
        )
    })

    // console.log(renderproducts)
    return (<div>
        <h1 className="p-4">OUR PRODUCTS LIST</h1>
        <div className="d-flex flex-wrap">
            {renderproducts}

        </div>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{cartproduct.title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img src={cartproduct.image} alt={cartproduct.title}></img>
                        <h3>₹{cartproduct.price}</h3>
                        <button className="btn btn-primary" onClick={incqty}>-</button><span className="p-3">{quantity}</span><button  className="btn btn-primary" onClick={decqty}>+</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Continue Shopping</button>
                        <button type="button" className="btn btn-warning"  data-bs-dismiss="modal" onClick={Gotocart}>Go to cart </button>
                    </div>
                </div>
            </div>
        </div>


    </div>)

}