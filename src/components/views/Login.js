/*
 Copyright (c) 2021 Christer Johansson of Sweden Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Form from "../../utilities/Forms";
import CustomDropDown from "../inputs/CustomDropDown";
import moment from "moment";
import Uploader from "../Uploader";
import FormData from 'form-data'

const Login = () => {

  const [RaffleName, setRaffleName] = useState("")
  const [RaffleCategory, setRaffleCategory] = useState(1)
  const [RaffleCause, setRaffleCause] = useState("")
  const [Quantity, setQuantity] = useState("")
  const [TicketPrefix, setTicketPrefix] = useState("")
  const [Cost, setCost] = useState("")
  const [Expiry, setExpiry] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [DrawingDate, setDrawingDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [DrawingTime, setDrawingTime] = useState(moment(new Date()).format('HH:MM'))
  const [DrawingType, setDrawingType] = useState(1)
  const [WinningType, setWinningType] = useState(1)
  const [Winning, setWinning] = useState("")
  const [Item, setItem] = useState("")
  const [Percentage, setPercentage] = useState("")
  const [Image, setImage] = useState("")
  const [ItemImage, setItemImage] = useState("")






  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  const [Data, setData] = useState(null)


  const getConstants = () => {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      "Authorization": "Bearer " + token
    };

    let config = {
      method: 'GET',
      headers: new Headers(headers),
    };

    fetch("https://rafflego.app/api/creator/settings", config).then(res => {
      res.json().then(response => {
        setData(response)
        console.log(response);
      }).catch(error => {
        console.log("error", error);
      })
    }).catch(err => {
      console.log("err", err);
    })
  }

  const createRaffle = (data,form) => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json',
      "Authorization": "Bearer " + token
    };

    let formdata = new FormData(form.target)
    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
      formdata.append(key, value);
      // console.log(formdata)
    }
    formdata.append('test', "test")
    console.log(formdata);
    let config = {
      method: 'POST',
      headers: new Headers(headers),
      body: formdata
    };
    setTimeout(() => {
      console.log("CONFIGS", config);
      fetch("https://rafflego.app/api/creator/create-raffle", config).then(res => {
        res.json().then(response => {
          setData(response)
          console.log(response);
        }).catch(error => {
          console.log("error", error);
        })
      }).catch(err => {
        console.log("err", err);
      })
    }, 2000)



  }

  useEffect(() => {
    getConstants()
  }, [])



  const validateLogin = (e) => {
    console.log("form===>",e);
    let isValid = true;

    let validator = Form.validator({
      RaffleName: {
        value: RaffleName,
        isRequired: true,
      },
      RaffleCategory: {
        value: RaffleCategory,
        isRequired: true,
      },
      RaffleCause: {
        value: RaffleCause,
        isRequired: true,
      },
      Quantity: {
        value: Quantity,
        isRequired: true,
      },
      TicketPrefix: {
        value: TicketPrefix,
        isRequired: true,
      },
      Cost: {
        value: Cost,
        isRequired: true,
      },
      Expiry: {
        value: Expiry,
        isRequired: true,
      },
      DrawingDate: {
        value: DrawingDate,
        isRequired: true,
      },
      DrawingTime: {
        value: DrawingTime,
        isRequired: true,
      },
      RaffleName: {
        value: RaffleName,
        isRequired: true,
      },
      DrawingType: {
        value: DrawingType,
        isRequired: true,
      },
      WinningType: {
        value: WinningType,
        isRequired: true,
      },
      Percentage: {
        value: Percentage,
        isRequired: false,
      },
      Winning: {
        value: Winning,
        isRequired: false,
      },

    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    if (isValid) {
      let data = {
        category_id: RaffleCategory,
        cause: RaffleCause,
        cost: Cost,
        draw_date: DrawingDate,
        draw_time: DrawingTime,
        drawtype_id: 1,
        expiry: Expiry,
        fund: "",
        image: Image,
        name: RaffleName,
        prefix: TicketPrefix,
        ticket_qty: Quantity,
        type: DrawingType,
        winningtype: DrawingType,
      }
      if (WinningType == 1) {
        data.physical_item_name = Item
      } else {
        data.winning = Winning
      }

      console.log("DATA=====>>>", data);
      createRaffle(data,e)
    }
    return isValid;


  };

  const authenticate = (e) => {
    e.preventDefault();

    const validate = validateLogin(e);

    if (validate) {
      setValidate({});
      setEmail("");
      setPassword("");
      // alert("Successfully Login");
    }
  };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="row g-0 auth-wrapper">
      {/* <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
      </div> */}
      <script type="module" src="script.js"></script>
      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p>Create Raffle</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={authenticate}
                autoComplete={"off"}
              >
                {/* <input type="file" accept="image/*"
                  onChange={(e) => {
                    console.log(e);
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }} />
                {
                  Image &&
                  <img className={`form-control `} src={Image} />
                } */}
                <div className="email mb-3">
                  <input
                    className={`form-control `}
                    id="name"
                    name="RaffleName"
                    value={RaffleName}
                    placeholder="Enter Raffle Name"
                    onChange={(e) => setRaffleName(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.RaffleName
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.RaffleName
                      ? validate.validate.RaffleName[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">

                  <select className={`form-control `} onChange={e => setRaffleCategory(e.target.value)}>
                    {

                      Data?.categories?.length > 0 ?
                        Data?.categories?.map((item, index) => {
                          return (
                            <option value={item?.id}>{item?.name}</option>
                          )
                        })
                        :
                        null
                    }
                  </select>

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.RaffleCategory
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.RaffleCategory
                      ? validate.validate.RaffleCategory[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">
                  <input
                    className={`form-control `}
                    id="RaffleCause"
                    name="RaffleCause"
                    value={RaffleCause}
                    placeholder="Enter Raffle Cause"
                    onChange={(e) => setRaffleCause(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.RaffleCause
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.RaffleCause
                      ? validate.validate.RaffleCause[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">
                  <input
                    type="number"
                    className={`form-control `}
                    id="Quantity"
                    name="Quantity"
                    value={Quantity}
                    placeholder="Ticket Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.Quantity
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.Quantity
                      ? validate.validate.Quantity[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">
                  <input
                    className={`form-control`}
                    id="TicketPrefix"
                    name="TicketPrefix"
                    value={TicketPrefix}
                    placeholder="TicketPrefix"
                    onChange={(e) => setTicketPrefix(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.TicketPrefix
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.TicketPrefix
                      ? validate.validate.TicketPrefix[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">
                  <input
                    type="number"
                    className={`form-control`}
                    id="Cost"
                    name="Cost"
                    value={Cost}
                    placeholder="Ticket Cost"
                    onChange={(e) => setCost(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.Cost
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.Cost
                      ? validate.validate.Cost[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">
                  <input
                    type="date"
                    className={`form-control ${validate.validate && validate.validate.Expiry
                      ? "is-invalid "
                      : ""
                      }`}
                    id="Expiry"
                    name="Expiry"
                    value={Expiry}
                    placeholder="Drawing Date"
                    onChange={(e) => setExpiry(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.Expiry
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.Expiry
                      ? validate.validate.Expiry[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">
                  <input
                    type="date"
                    className={`form-control ${validate.validate && validate.validate.DrawingDate
                      ? "is-invalid "
                      : ""
                      }`}
                    id="DrawingDate"
                    name="DrawingDate"
                    value={DrawingDate + ""}
                    placeholder="Drawing Date"
                    onChange={(e) => setDrawingDate(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.DrawingDate
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.DrawingDate
                      ? validate.validate.DrawingDate[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">
                  <input
                    type="time"
                    className={`form-control ${validate.validate && validate.validate.DrawingTime
                      ? "is-invalid "
                      : ""
                      }`}
                    id="DrawingTime"
                    name="DrawingTime"
                    value={DrawingTime}
                    placeholder="Drawing Time"
                    onChange={(e) => setDrawingTime(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.DrawingTime
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.DrawingTime
                      ? validate.validate.DrawingTime[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">

                  <select className={`form-control `} onChange={e => setDrawingType(e.target.value)}>
                    {

                      Data?.drawtype?.length > 0 ?
                        Data?.drawtype?.map((item, index) => {
                          return (
                            <option value={item?.id}>{item?.name}</option>
                          )
                        })
                        :
                        null
                    }

                  </select>

                  <div
                    className={`invalid-feedback text-start ${validate.validate && validate.validate.DrawingType
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    {validate.validate && validate.validate.DrawingType
                      ? validate.validate.DrawingType[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">
                  <div className="email mb-3">

                    <select className={`form-control `} onChange={e => setWinningType(e.target.value)}>
                      {

                        Data?.raffle_type?.length > 0 ?
                          Data?.raffle_type?.map((item, index) => {
                            return (
                              <option value={item?.id}>{item?.name}</option>
                            )
                          })
                          :
                          null
                      }
                      {/* // <option value="1">Percentage</option>
                      // <option value="2">Fix Cash Prize</option>
                      // <option value="3">Physcial Item</option> */}
                    </select>

                    <div
                      className={`invalid-feedback text-start ${validate.validate && validate.validate.email
                        ? "d-block"
                        : "d-none"
                        }`}
                    >
                      {validate.validate && validate.validate.WinningType
                        ? validate.validate.WinningType[0]
                        : ""}
                    </div>
                  </div>

                </div>

                {
                  WinningType == 1
                    ?
                    <div className="email mb-3">
                      <input
                        className={`form-control ${validate.validate && validate.validate.Item
                          ? "is-invalid "
                          : ""
                          }`}
                        id="Item"
                        name="Item"
                        value={Item}
                        placeholder="Item Name"
                        onChange={(e) => setItem(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${validate.validate && validate.validate.Item
                          ? "d-block"
                          : "d-none"
                          }`}
                      >
                        {validate.validate && validate.validate.Item
                          ? validate.validate.Item[0]
                          : ""}
                      </div>
                      {/* <input type="file" accept="image/*"
                        onChange={(e) => {
                          console.log(e);
                          setItemImage(URL.createObjectURL(e.target.files[0]))
                        }} />
                      {
                        ItemImage &&
                        <img className={`form-control `} src={ItemImage} />
                      } */}
                    </div>
                    :
                    <div className="email mb-3">
                      <input
                        type="number"
                        className={`form-control ${validate.validate && validate.validate.Winning
                          ? "is-invalid "
                          : ""
                          }`}
                        id="Winning"
                        name="Winning"
                        value={Winning}
                        placeholder="Percentage"
                        onChange={(e) => setWinning(e.target.value)}
                      />

                      <div
                        className={`invalid-feedback text-start ${validate.validate && validate.validate.Winning
                          ? "d-block"
                          : "d-none"
                          }`}
                      >
                        {validate.validate && validate.validate.Winning
                          ? validate.validate.Winning[0]
                          : ""}
                      </div>
                    </div>

                }



                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Create Raffle
                  </button>
                </div>
              </form>

              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
