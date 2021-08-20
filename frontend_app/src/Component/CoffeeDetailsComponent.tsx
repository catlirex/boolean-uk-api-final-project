import React from "react";
import styled from "styled-components";
import useStore, { CoffeeType } from "../store";
import { APP_COLOR } from "../consistent";
import { useEffect } from "react";

import SelectSize from "./SelectSpecialFeatures/SelectSize";
import SelectMilk from "./SelectSpecialFeatures/SelectMilk";
import SelectShot from "./SelectSpecialFeatures/SelectShots";
import SelectSyrup from "./SelectSpecialFeatures/SelectSyrup";
import SelectIce from "./SelectSpecialFeatures/SelectIce";
import QuantityComponent from "./QuantityComponent";
import CoffeeDetailsFooter from "./CoffeeDetailFooter";
import { useHistory } from "react-router-dom";

const DetailComponentUl = styled.ul`
  display: grid;
  background-color: ${APP_COLOR.wheat};
  width: 290px;

  .details {
    display: grid;
    align-items: center;

    text-align: center;

    padding: 0.5rem;
    width: 290px;

    color: ${APP_COLOR.darkGray};
  }

  form {
    width: 290px;
  }
`;

export default function CoffeeDetailsComponent() {
  const selectedCoffee = useStore(store => store.selectedCoffee);
  const loginUser = useStore(store => store.loginUser);
  const cart = useStore(store => store.cart);
  const shops = useStore(store => store.shops);
  const fetchSpecialRequests = useStore(store => store.fetchSpecialRequests);
  const setCart = useStore(store => store.setCart);
  const completeTransaction = useStore(store => store.completeTransaction);

  const history = useHistory();

  useEffect(() => {
    fetchSpecialRequests();
  }, [fetchSpecialRequests]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      quantity: { value: string };
      size: { value: string };
      milk: { value: string };
      shot: { value: string };
      ice: { value: string };
      syrup: [{ checked: boolean; value: string }];
    };

    const syrups = [...target.syrup]
      .filter(input => input.checked)
      .map(input => input.value);

    if (cart?.coffee_orders) {
      const newCoffee = {
        quantity: parseInt(target.quantity.value),
        coffee_id: parseInt(target.size.value),
        specialRequests: [
          { specialRequestId: parseInt(target.milk.value) },
          { specialRequestId: parseInt(target.shot.value) },
        ],
      };
      if (syrups.length) {
        for (const syrup of syrups) {
          newCoffee.specialRequests.push({
            specialRequestId: parseInt(syrup),
          });
        }
      }

      if (target.ice)
        newCoffee.specialRequests.push({
          specialRequestId: parseInt(target.ice.value),
        });
      const newCart = cart;
      newCart?.coffee_orders?.push(newCoffee);
      setCart(newCart);
      console.log(newCart);
    } else {
      const transactions = {
        ...cart,
        estimated_pickup_time: "",
        user_id: loginUser?.id,
        coffee_orders: [
          {
            quantity: parseInt(target.quantity.value),
            coffee_id: parseInt(target.size.value),
            specialRequests: [
              { specialRequestId: parseInt(target.milk.value) },
              { specialRequestId: parseInt(target.shot.value) },
            ],
          },
        ],
      };
      if (syrups.length) {
        for (const syrup of syrups) {
          transactions.coffee_orders[0].specialRequests.push({
            specialRequestId: parseInt(syrup),
          });
        }
      }

      if (target.ice)
        transactions.coffee_orders[0].specialRequests.push({
          specialRequestId: parseInt(target.ice.value),
        });

      let waitingMinutes = shops.find(
        target => target.id === cart?.shop_id
      )?.estimateTime;

      if (waitingMinutes) {
        let estimateTime = new Date(
          Date.now() + waitingMinutes * 60000
        ).toISOString();
        transactions.estimated_pickup_time = estimateTime;
      }
      setCart(transactions);
      completeTransaction();
    }

    history.push("/user/orderPreview");
  };

  if (!selectedCoffee) return <h1>Loading...</h1>;
  const coffeeToDisplay = selectedCoffee[0];

  return (
    <DetailComponentUl>
      <img
        src={coffeeToDisplay.image}
        alt={coffeeToDisplay.name}
        height="auto"
        width="290px"
      />
      <h1 className="details">{coffeeToDisplay.name}</h1>
      <p className="details">{coffeeToDisplay.description}.</p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <h2 className="details">Cuztomize your drink!</h2>

        <h3 className="details">Quantity:</h3>

        <QuantityComponent />

        <h3 className="details">Select your cup size:</h3>

        <SelectSize />

        <h3 className="details">Select milk:</h3>

        <SelectMilk />

        <h3 className="details">How many shots?</h3>

        <SelectShot />

        <h3 className="details">Choose a syrup</h3>

        <SelectSyrup />

        {coffeeToDisplay.ice ? (
          <>
            <h3 className="details">Ice?</h3>
            <SelectIce />
          </>
        ) : null}

        <CoffeeDetailsFooter />
      </form>
    </DetailComponentUl>
  );
}
