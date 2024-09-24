
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, AllItems } from '../../Redux/ProductSlice';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer,toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { Badge, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import './AllProd.css';

function AllProducts() {
  const[prodcat,setProdCat]=useState([])
  const[catfilter,setCatFilter]=useState('all')
  const[search,setSearch]=useState('')
  const dispatch = useDispatch();
  const { AllProds, cart, isLoading } = useSelector((state) => state.prod);

  useEffect(() => {
    dispatch(AllItems()).then((res)=>{
      getCategory(res?.payload)
    });
  }, [dispatch]);

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.title} added to cart!`);
  };

  const handlesearch=(e)=>{
    setSearch(e.target.value)
   }

  const handleCategory=(e)=>{
    setCatFilter(e.target.value)
   }

  const getCategory=(data)=>{
    const catArray=[]
    data.map((prod)=>{
      catArray.push(prod?.category)
    })
    
    const uniqueCat=[...new Set(catArray)]
    setProdCat(uniqueCat)
  }

  return (
    <>
    <Box className='icons'>
     <TextField id="outlined-basic" label="search by name" variant="outlined" onChange={handlesearch} />
  
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Category"
    value={catfilter}
    onChange={handleCategory}
    className='cate'
  >
    <MenuItem
     selected value="all">All</MenuItem>
    {
      prodcat.map((cat)=>{
        return (
          <MenuItem value={cat}>{cat}</MenuItem>
        )
      })
    }
  </Select>
  {/* <Link to={'/cart'}>
          <IconButton aria-label="cart">
            <Badge badgeContent={cart?.length} color="primary">
              <ShoppingCartIcon sx={{ fontSize: '30px' }} />
            </Badge>
          </IconButton>
        </Link> */}
        </Box>
      {/* <Toaster position="top-right" /> */}
      {isLoading ? <Typography>Loading...</Typography>:
      <Box className="e-commerce">
        
        <Container disableGutters maxWidth="lg">
        <Grid container spacing={2}>
          {AllProds?.filter((prod)=>{
            if(catfilter=="all"){
              return prod
            }else{
              return prod.category==catfilter
            }
          }).filter((prod)=>{
            if(search.length==0){
              return prod
            }else{
              return prod.title.toLowerCase().includes(search.toLowerCase())
            }
              
          }).map((item)=>{
              return (
                <Grid item xs={12} md={6} sm={12} lg={3} key={item.id}>
                  <Card
                    style={{
                      height: '380px',
                      boxShadow: ' 0 4px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s'
                    }}
                    className="card_items"
                  >
                    <CardMedia
                      className="product_image"
                      component="img"
                      style={{
                        height: '120px',
                        objectFit: 'contain',
                        border: '5px'
                      }}
                      alt="product"
                      image={item?.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" className='title' >
                        {item?.title}
                      </Typography>
                      <Typography gutterBottom variant="h6">
                        {item?.price}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ alignItems: 'center' }}>
                      <Button
                        sx={{ margin: 'auto', backgroundColor: '#495bc2', color: 'white' }}
                        className="addbtn"
                        size="medium"
                        onClick={() => addItemToCart(item)}
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      }
      <ToastContainer/>
    </>
  );
}

export default AllProducts;
