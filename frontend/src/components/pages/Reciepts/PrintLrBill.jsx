import React, {useContext} from 'react'
import './PrintLr.css'
import logo from '../../../assets/Logo1.png';
import { useLocation } from 'react-router-dom';
const PrintLrBill = () => {
 const location = useLocation();
   const { items , formData } = location.state || {};
 
   // Safe value function to prevent undefined or null rendering
   const safeValue = (value) => (value !== null && value !== undefined ? value : ''); 
   // Ensure that tableRows and formData are available
   if (!items || !formData) {
     return <div>No data available</div>;
   }
  return (
    <>
      <div className="receipt">
          <i className="i">(Extra Copy For Billing)</i>
  
          <div className="all">
            <div className="header-lr">
              <div className="logo-container">
                <img src={logo} alt="TFC LOGO" />
              </div>
              <div className="address">
                <h1>TRANSFAST CORPORATION</h1>
                <p>448/B, NEAR MAHINDRA SHOWROOM, NH4 HIGHWAY, M.I.D.C., SHIROLI, KOLHAPUR, MAHARASHTRA. 416 122</p>
                <p>CONTACT NUMBER: 9923826075 / 7385113939 / 9960909651</p>
                <p>GST NUMBER: 27ANEPC0107H1Z0</p>
                <p>Email ID: transfast.corporation@gmail.com</p>
              </div>
            </div>
  
            <div className="section-content">
              <table>
                <tbody>
                  <tr>
                    <td rowSpan="2">Consignor:</td>
                    <td rowSpan="2" colSpan="5">{safeValue(formData.consignor)}</td>
                    <th colSpan="2">LORRY RECEIPT</th>
                  </tr>
                  <tr>
                    <td>Number</td>
                    <td>{safeValue(formData.lrNumber)}</td>
                  </tr>
                  <tr>
                    <td rowSpan="2">Consignee:</td>
                    <td rowSpan="2" colSpan="5">{safeValue(formData.consignee)}</td>
                    <td>Date</td>
                    <td>{safeValue(formData.lrDate)}</td>
                  </tr>
                  <tr>
                    <td>From</td>
                    <td>{safeValue(formData.from)}</td>
                  </tr>
                  <tr>
                    <td>Freight Payable Company:</td>
                    <td colSpan="5">{safeValue(formData.freightPayableCompany)}</td>
                    <td>To</td>
                    <td>{safeValue(formData.to)}</td>
                  </tr>
                  <tr>
                    <td>Invoice Value:</td>
                    <td colSpan="2">{safeValue(formData.invoiceValue)}</td>
                    <td>Driver's Contact:</td>
                    <td colSpan="2">{safeValue(formData.driversContact)}</td>
                    <td>Vehicle No.:</td>
                    <td>{safeValue(formData.vehicleNumber)}</td>
                  </tr>
                  <tr>
                    <td>Pay Type:</td>
                    <td>{safeValue(formData.paymentMode)}</td>
                    <td>Billing Branch:</td>
                    <td>{safeValue(formData.billingBranch)}</td>
                    <td>Collection Type:</td>
                    <td>{safeValue(formData.collectionType)}</td>
                    <td>Delivery Type:</td>
                    <td>{safeValue(formData.deliveryType)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <table className='combine'>
              <table className='table-3'>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Description</th>
                    <th>Invoice No.</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Actual Weight</th>
                    <th>Chargeable Weight</th>
                    <th>Eway Bill No.</th>
                    <th>Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
          {Array.from({ length: 10 }).map((_, index) => {
            const _item = items[index]; // Check if item exists at this index
            return (
              <tr key={index}>
                <td>{safeValue(index + 1)}</td>
                <td>{safeValue(_item?.description)}</td>
                <td>{safeValue(_item?.invoiceNumber)}</td>
                <td>{safeValue(_item?.quantity)}</td>
                <td>{safeValue(_item?.rate)}</td>
                <td>{safeValue(_item?.actualWeight)}</td>
                <td>{safeValue(_item?.chargeableWeight)}</td>
                <td>{safeValue(_item?.EwayBillNo)}</td>
                <td>{safeValue(_item?.expiryDate)}</td>
              </tr>
            );
          })}
        </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="2">TOTAL AMOUNT IN FIGURES:</th>
                    <td colSpan="7"></td>
                  </tr>
                </tfoot>
              </table>
  
              <table className='table-4'>
                <thead>
                  <tr>
                    <th colSpan={2}>FREIGHT</th>
                  </tr>
                </thead>
                <tbody>
                
                      <tr>
                        <td>FREIGHT:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>SUR CHARGES</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>STATISTICAL CHARGES</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>HAMALI:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>DC CHARGES:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>DD CHARGES:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>HOLTING:</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>OTHER:</td>
                        <td></td>
                      </tr>
               
                </tbody>
                <tfoot>
                  <tr>
                    <th>TOTAL</th>
                    <td>______</td>
                  </tr>
                </tfoot>
              </table>
            </table>
  
            <div className="payment-details-rc">
                              <table>
                                  <thead>
                                      <tr>
                                          <td rowSpan={3}></td>
                                          <th colSpan="" rowSpan="">PAYMENT DETAILS:-</th>
                                          <td rowSpan={3}></td>
                                      </tr>
                                      <tr>
                                          <td>A/C NO :- 331308080180, ICICI BANK, MIDC SHIROLI, KOLHAPUR.</td>
                                      </tr>
                                      <tr>
                                          <td>PHONEPAY/GPAY :- 9921296075</td>
                                      </tr>
                                      <tr>
                                          <th colSpan="" rowSpan="">Consignee's Signature & Stamp</th>
                                          <td>IFSC CODE:- ASFSAF</td>
                                          <th colSpan="" rowSpan="">TRANSFAST CORPORATION</th>
                                      </tr>
                                  </thead>
                              </table>
                          </div>
          </div>
        </div>
    </>
  )
}

export default PrintLrBill