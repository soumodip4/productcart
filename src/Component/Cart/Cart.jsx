// import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, deleteItem, increment } from '../../Redux/ProductSlice'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import "./Cart.css"


function Cart() {
    const dispatch = useDispatch()
    const { cart, TotalPrice } = useSelector((s) => s.prod)

    const incrementItem = (id) => {
        dispatch(increment(id))
    }
    const decrementItem = (id) => {
        dispatch(decrement(id))
    }
    const handeldelete = (id) => {
        dispatch(deleteItem(id))
    }
    return (
           

        <>
            <Typography className='total-price'>
                <h4>Total price: {TotalPrice}</h4>

            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            {/* <TableCell align="right">Inc Dec</TableCell> */}
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.length > 0 ? cart.map((row) => (
                            <TableRow
                                key={row.id}
                                className="cart-row"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{row?.id}</TableCell>
                                <TableCell align="right">
                                    <img className="cart-image" src={row?.image} alt={row?.title} />
                                </TableCell>
                                <TableCell align="right" style={{color:"orange",fontSize:"20px",textAlign:"center"}}>{row?.title}</TableCell>
                                <TableCell align="right">{row?.price}</TableCell>
                                {/* <TableCell align="right">{row?.quantity}</TableCell> */}
                                <TableCell align="right">
                                    <Button variant="contained" style={{backgroundColor: "#4caf50"}} className='cartButton increment-btn' size="small" onClick={() => incrementItem(row.id)}>+</Button>
                                    <span className='rowQ' style={{color:"blue",fontSize:"20px",margin:"2px", border:"2px"}}>{row?.quantity}</span>
                                    <Button variant="contained" style={{backgroundColor: "#f57c00"}} className='cartButton decrement-btn' size="small" onClick={row?.quantity == 1 ? () => handeldelete(row.id) : () => decrementItem(row.id)}>-</Button>
                                </TableCell>
                                <TableCell align="right">{row?.updatePrice}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" style={{backgroundColor: "#d32f2f"}} className='cartButton delete-btn' size="small" onClick={() => handeldelete(row?.id)}><DeleteIcon color="anger"  /></Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <Typography className='empty'>
<                                h2>No Item</h2>
                            </Typography>
                            
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default Cart
