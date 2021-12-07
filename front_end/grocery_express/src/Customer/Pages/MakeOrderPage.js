import React, { useState,useContext }   from 'react';

import { StoreContext } from '../../StoreContext';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CustomerStorePage } from './CustomerStorePage';
import { StoreItemsPage } from './StoreItemsPage';
import { NewOrderPopup} from '../Component/NewOrderPopup'
import { OrderCheckoutPage } from './OrderCheckoutPage';
import {OrderConfirmPage} from './OrderConfirmPage'



const steps = ['Select a store', 'Add Items', 'Confirm' , 'Order Review'];

export  function CustomerOrderPage () {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [selectedStoreId, setSelectedStoreId] = useState(-1)
    const [newOrderPopupOpen, setNewOrderPopupOpen] = useState(false);
    const [createdOrder, setCreatedOrder]= useState({})
    const store = useContext(StoreContext);

    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStoreSelcted = (storeId) =>{
      console.log(storeId)
      // check if there is already one pending order?
      if(store.store.pendingOrders && store.store.pendingOrders.storeId !== storeId){
         handleOpenNewOrderPopup(storeId)
         return
      }
      if(store.store.pendingOrders && store.store.pendingOrders.storeId == storeId){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSelectedStoreId(storeId);
          return;
      }
      else{
        var newStores={
            ...store.store,
            pendingOrders:{
                storeId: storeId,
                items:{}
           } 
        }
        console.log(newStores)
        store.setStore(newStores)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSelectedStoreId(storeId);
      }
    }
    
    const handleAddNewOrder = ()=>{
      delete store.store['pendingOrders']  
      var newStores={
        ...store.store,
      }
    store.setStore(newStores)
      //closeDialog
      handleCloseNewOrderPopup()
    }

    const handleOpenNewOrderPopup= (storeId)=>{
        setNewOrderPopupOpen(true) 
    }

    const handleCloseNewOrderPopup =() =>{
        setNewOrderPopupOpen(false);
    }
  
    const handleReset = () => {
      setActiveStep(0);
    };

    const checkoutCallback =(order)=>{
       setActiveStep(3)
       if(order){
          setCreatedOrder(order);
       } 
    }

    const resetOrder =() =>{
      delete store.store['pendingOrders']  
      var newStores={
        ...store.store,
      }
      store.setStore(newStores)
      setActiveStep(0);
    }
  
    return (
      <Box sx={{ width: '100%' }}>
        
        <Stepper style={{marginTop:"10px"}} activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
               { activeStep === 0 &&
                <div>
                <CustomerStorePage handleSelect={handleStoreSelcted}/>
                 {newOrderPopupOpen && <NewOrderPopup handleAddNewOrder={handleAddNewOrder} handleClose={handleCloseNewOrderPopup} open={newOrderPopupOpen}/>}
                </div>
               }
               {activeStep ===1 && selectedStoreId !== -1 &&
                <StoreItemsPage storeId ={selectedStoreId}/>
               }
               {activeStep ===2 && <OrderCheckoutPage checkoutCallback={checkoutCallback} resetOrder={resetOrder}/>}
               {activeStep ===3 && createdOrder && createdOrder.id && <OrderConfirmPage order={createdOrder}/>}
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {activeStep<3 &&<Button
                color="inherit"
                disabled={activeStep== 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>}
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep<3 &&<Button disabled={activeStep== 2 || selectedStoreId ==-1}onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>}
            </Box>
          </React.Fragment>
        )}
      </Box>
    );
  }
  