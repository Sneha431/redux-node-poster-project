import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
var randomstring = require("randomstring");
const Prospect = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  let prospectid = queryParameters.get("customer_id");
  const submitform = async (data) => {
    console.log(prospectid);
    // setTimeout(() => {
    //   navigate("/checkout", {
    //     state: {
    //       data,
    //     },
    //   });
    // }, 1000);
    if (prospectid) {
      const result = await fetch(
        `http://localhost:5000/updateprospectdata/${prospectid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: getValues("firstName"),
            lastName: getValues("lastName"),
            email: getValues("email"),
            phone: getValues("phone"),
            shippingAddress1: getValues("shippingAddress1"),
            shippingAddress2: getValues("shippingAddress2"),
            shippingCountry: getValues("shippingCountry"),
            shippingCity: getValues("shippingCity"),
            shippingState: getValues("shippingState"),
            shippingZip: getValues("shippingZip"),
          }),
        }
      );
      const json = await result.json();
      if (json) {
        setTimeout(() => {
          var customer_id = createSearchParams({
            // customer_id: randomstring.generate({
            //   length: 10,
            //   charset: "alphanumeric",
            // }),
            customer_id: prospectid,
          }).toString();
          navigate("/checkout?" + customer_id, {
            state: {
              data,
            },
          });
        }, 1000);
      }
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      const result = await fetch("http://localhost:5000/insertprospectdata/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: getValues("firstName"),
          lastName: getValues("lastName"),
          email: getValues("email"),
          phone: getValues("phone"),
          shippingAddress1: getValues("shippingAddress1"),
          shippingAddress2: getValues("shippingAddress2"),
          shippingCountry: getValues("shippingCountry"),
          shippingCity: getValues("shippingCity"),
          shippingState: getValues("shippingState"),
          shippingZip: getValues("shippingZip"),
        }),
      });
      localStorage.setItem("data", JSON.stringify(data));
      const json = await result.json();

      if (json) {
        setTimeout(() => {
          var customer_id = createSearchParams({
            // customer_id: randomstring.generate({
            //   length: 10,
            //   charset: "alphanumeric",
            // }),
            customer_id: json._id,
          }).toString();
          navigate("/checkout?" + customer_id, {
            state: {
              data,
            },
          });
        }, 1000);
      }
    }
  };
  return (
    <main className="main-content">
      <div className="container">
        <form onSubmit={handleSubmit(submitform)} className="row g-3">
          <div className="mb-3">
            <div className="fields__elements fields__elements--half">
              <label htmlFor="first-name" className="form-label">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                id="first-name"
                className="form-control"
                {...register("firstName", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z]*$/,
                    message: "First name is not valid",
                  },
                })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).firstName
                    ? JSON.parse(localStorage.getItem("data")).firstName
                    : ""
                }
              />

              {errors.firstName?.type === "required" && (
                <p className="alert-p">First Name is required</p>
              )}
              <p className="alert-p">
                {errors.firstName && errors.firstName.message}
              </p>
            </div>
            <div className="col-auto">
              <label htmlFor="last-name" className="form-label">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                id="last-name"
                className="form-control"
                {...register("lastName", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z]*$/,
                    message: "First name is not valid",
                  },
                })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).lastName
                    ? JSON.parse(localStorage.getItem("data")).lastName
                    : ""
                }
              />
              {errors.lastName?.type === "required" && (
                <p className="alert-p">Last Name is required</p>
              )}

              <p className="alert-p">
                {errors.lastName && errors.lastName.message}
              </p>
            </div>
            <div className="col-auto">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).email
                    ? JSON.parse(localStorage.getItem("data")).email
                    : ""
                }
              />
              {errors.email && (
                <p className="alert-p">Please enter a valid email id</p>
              )}
            </div>
            <div className="col-auto">
              <label htmlFor="phone" className="form-label">
                Contact Number *
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                className="form-control"
                {...register("phone", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).phone
                    ? JSON.parse(localStorage.getItem("data")).phone
                    : ""
                }
              />
              {errors.phone?.type === "required" && (
                <p className="alert-p">Please enter a valid contact number</p>
              )}
              {errors.phone?.type === "minLength" && (
                <p className="alert-p">
                  The shipping Zip should have at least 10 characters
                </p>
              )}
              {errors.phone?.type === "maxLength" && (
                <p className="alert-p">
                  The shipping Zip should have 10 characters
                </p>
              )}
            </div>

            <div className="col-auto">
              <label htmlFor="shipping-address" className="form-label">
                Shipping Address line 1 *
              </label>
              <input
                type="text"
                name="shippingAddress1"
                id="shipping-address"
                className="form-control"
                {...register("shippingAddress1", { required: true })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).shippingAddress1
                    ? JSON.parse(localStorage.getItem("data")).shippingAddress1
                    : ""
                }
              />
              {errors.shippingAddress1 && (
                <p className="alert-p">
                  Please enter your shipping address line 1
                </p>
              )}
            </div>
            <div className="col-auto">
              <label htmlFor="shipping-address" className="form-label">
                Shipping Address line 2*
              </label>
              <input
                type="text"
                className="form-control"
                name="shippingAddress2"
                id="shipping-address"
                {...register("shippingAddress2", { required: false })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).shippingAddress2
                    ? JSON.parse(localStorage.getItem("data")).shippingAddress2
                    : ""
                }
              />
              {/* {errors.shippingAddress1 && (
                <p className="alert-p">
                  Please enter your shipping address line 2
                </p>
              )} */}
            </div>

            <div className="col-auto">
              <label htmlFor="country" className="form-label">
                Country *
              </label>
              <select
                name="shippingCountry"
                className="form-control"
                id="country"
                {...register("shippingCountry", { required: true })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).shippingCountry
                    ? JSON.parse(localStorage.getItem("data")).shippingCountry
                    : ""
                }
              >
                <option value="US">United States</option>
              </select>
              {errors.shippingCountry && (
                <p className="alert-p">Please enter your shipping country</p>
              )}
            </div>

            <div className="col-auto">
              <label htmlFor="city" className="form-label">
                City *
              </label>
              <input
                type="text"
                name="shippingCity"
                id="city"
                className="form-control"
                {...register("shippingCity", { required: true })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).shippingCity
                    ? JSON.parse(localStorage.getItem("data")).shippingCity
                    : ""
                }
              />
              {errors.shippingCity && (
                <p className="alert-p">Please enter your shipping city</p>
              )}
            </div>

            <div className="col-auto">
              <label htmlFor="state" className="form-label">
                State *
              </label>

              <select
                name="shippingState"
                id="states"
                className="form-control"
                {...register("shippingState", { required: true })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).shippingState
                    ? JSON.parse(localStorage.getItem("data")).shippingState
                    : ""
                }
              >
                <option value="">Select Your State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              {errors.shippingState && (
                <p className="alert-p">Please enter your shipping state</p>
              )}
            </div>

            <div className="col-auto">
              <label htmlFor="zip" className="form-label">
                Zip Code *
              </label>
              <input
                type="number"
                name="shippingZip"
                className="form-control"
                {...register("shippingZip", {
                  required: true,
                  maxLength: 5,
                  minLength: 5,
                })}
                defaultValue={
                  localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data")).shippingZip
                    ? JSON.parse(localStorage.getItem("data")).shippingZip
                    : ""
                }
              />
              {errors.shippingZip?.type === "required" && (
                <p className="alert-p">Please enter your shipping zip</p>
              )}
              {errors.shippingZip?.type === "minLength" && (
                <p className="alert-p">
                  The shipping Zip should have at least 5 characters
                </p>
              )}
              {errors.shippingZip?.type === "maxLength" && (
                <p className="alert-p">
                  The shipping Zip should have 5 characters
                </p>
              )}
            </div>
          </div>

          <button type="submit">Rush to Checkout</button>
        </form>
      </div>
    </main>
  );
};

export default Prospect;
