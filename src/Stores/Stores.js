import React, {Component} from 'react'
import ApiContext from '../ApiContext'
import config from '../config'


export default class Stores extends Component {
  static contextType = ApiContext    

  handleEdit(id){
    const storeid=id
    console.log(storeid)
    this.context.handleStoreId(storeid)
  }
  handleClickDelete = e => {
    e.preventDefault()
    const storeid = parseInt((this.props.match.params.id).slice(1),10)
    console.log(storeid)
    fetch(`${config.API_ENDPOINT}/api/stores/${storeid}`, {
      method: 'DELETE',
      
      headers: {
        'content-type': 'application/json'
      },
    })
  
      .then(res => {
        if(!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
      })
      .then(() => {
        
        this.context.handleDeleteStore(storeid)
        this.props.history.push(`/`)
        
      })
      .catch(error => {
        console.error({ error })
      })

  }

    render(){
    const stores= this.context.stores
    const id=parseInt((this.props.match.params.id).slice(1),10)
    const storeArr=[]
    for(let i=0; i<stores.length; i++){
      if(stores[i].storeid===id){
        storeArr.push(stores[i])
      }
    }
    const ratings=this.context.ratings
    const packagings=this.context.packagings
    const categories=this.context.categories
    return (
    <div className="Stores">
     

     {storeArr.map(store =>
<ul key={store.storeid}>
       
             <>
             <br/>   
                    
             <li>{store.storename}</li>
                   
            <br/> 
            {categories.map(category =>
              category.categoriesid===store.categoriesid
              ?<li key={category.categoriesid}>Category: {category.categoriesdescription} </li>
              :null)}
            
                   
                   <br/> 
            <li>{store.website}</li> 
                   
                   <br/> 
            <li>{store.comments}</li> 
            <br/> 
            {packagings.map(packaging =>
            packaging.packagingsid===store.packagingsid
            ? <li key={packaging.packagingsid}>Sustainable Packaging?: {packaging.packagingsdescription}</li>
            : null)}
            <br/> 
            {ratings.map(rating =>
              rating.ratingsid===store.ratingsid
              ?<li key={rating.ratingsid}>Rating: {rating.ratingsdescription}</li>
            : null)}
             <br/> 
            <li>Last Modified: {(store.lastdatemodified).slice(0,10)}</li> 
                   
                   <br/> 

            {/* <Link to='/edit-store'><button onClick={()=>this.handleEdit(id)} >Edit Store</button></Link> */}
                    
           
           <button className='store__delete'
          type='button'
          onClick={this.handleClickDelete}>Delete Store</button>

           </> 
        
        
        

        </ul>
      )}
    
    </div>
  );
}
}