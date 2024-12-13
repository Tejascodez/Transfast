import React from 'react';
import PrintLrDup from './PrintLrDup';
import PrintLrBill from './PrintLrBill';
import PrintLrHead from './PrintLrHead';
import logo from '../../../assets/Logo1.png';
import './PrintLr.css';

const PrintLr = () => {
  return (
    <>
      <div className="receipt">
        <i className="i">(Original Copy For Consignee)</i>

        <div className="all">
          <div className="header">
            <div className="logo-container">
              <img src={logo} alt="TFC LOGO" />
            </div>
            <div className="address">
              <h1>TRANSFAST CORPORATION</h1>
              <p>448/B, NEAR MAHINDRA SHOWROOM, NH4 HIGHWAY, M.I.D.C., SHIROLI, KOLHAPUR, MAHARASHTRA. 416 122</p>
              <p>CONTACT NUMBER: 9921296075 / 7385113939 / 9960909651</p>
              <p>GST NUMBER: 27ANEPC0107H1Z0</p>
              <p>Email ID: transfast.corporation@gmail.com</p>
            </div>
          </div>

          <div className="section-content">
            <table>
              <tr>
                <td rowSpan="2">Consignor:</td>
                <td rowSpan="2" colSpan="5"></td>
                <th colSpan="2">LORRY RECEIPT</th>
              </tr>
              <tr>
                <td>Number</td>
                <td>TC202420250001</td>
              </tr>
              <tr>
                <td rowSpan="2">Consignee:</td>
                <td rowSpan="2" colSpan="5"></td>
                <td>Date</td>
                <td>12/04/2024</td>
              </tr>
              <tr>
                <td>From</td>
                <td></td>
              </tr>
              <tr>
                <td>Freight Payable Company:</td>
                <td colSpan="5"></td>
                <td>To</td>
                <td></td>
              </tr>
              <tr>
                <td>Invoice Value:</td>
                <td colSpan="2"></td>
                <td>Driver's Contact:</td>
                <td colSpan="2"></td>
                <td>Vehicle No.:</td>
                <td></td>
              </tr>
              <tr>
                <td>Pay Type:</td>
                <td>PAID</td>
                <td>Billing Branch:</td>
                <td>KOLHAPUR</td>
                <td>Collection Type:</td>
                <td>Door Collection</td>
                <td>Delivery Type:</td>
                <td>Door Delivery</td>
              </tr>
            </table>
          </div>

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
                <th colSpan="2">Freight</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  Freight:<br />
                  Sur. Charges:<br />
                  Statiscal Charges:<br />
                  Hamali:<br />
                  DC Charges:<br />
                  DD Charges:<br />
                  Holting:<br />
                  Other:<br />
                </td>
                <td>200000000</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">TOTAL AMOUNT IN WORDS:</td>
                <td colSpan="7"></td>
                <td>TOTAL</td>
                <td>3423</td>
              </tr>
            </tfoot>
          </table>

          <div className="footer">
            <table>
              <tr>
                <td colSpan="4" rowSpan="4">Consignee's Signature & Stamp</td>
                <td colSpan="4" rowSpan="4">PAYMENT DETAILS</td>
                <td colSpan="4" rowSpan="4">TRANSFAST CORPORATION</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <PrintLrDup />
      <PrintLrBill />
      <PrintLrHead />
    </>
  );
};

export default PrintLr;
