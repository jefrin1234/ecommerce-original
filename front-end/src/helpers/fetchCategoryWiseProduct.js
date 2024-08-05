import summaryApi from "../common"


const fetchCartegoryWiseProduct = async(category)=>{
  const response = await fetch(summaryApi.categoryWiseProduct.url,{
    method : summaryApi.categoryWiseProduct.method,
    headers : {
      "content-type":"application/json"
    },
    body : JSON.stringify({
      category : category
    })
  })

  const dataResponse = await  response.json() 

  return dataResponse

}

export default fetchCartegoryWiseProduct