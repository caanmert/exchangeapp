import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import './Converter.css';

class Converter extends Component {
  state = {
    currencies: ["EUR", "BGN", "TRY", "USD", "AUR", "CHF", "PLN", "RUB"],
    base: "EUR",
    amount: "",
    convertTo: "BGN",
    result: "",
    date: ""
  };

  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  switchSelect = () => {
    let curBase = this.state.base
    let curTo = this.state.convertTo
    this.setState(
      {
        base: curTo,
        convertTo: curBase
      },
      this.calculate
    )
  }

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value,
        result: null,
        date: null
      },
      this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(res => res.json())
        .then(data => {
          const date = data.date;
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
          this.setState({
            result,
            date
          });
        });
    }
  };

  render() {
    return (
      <Card className="converter text-center" /*style={{ color: "white", width: "18rem", backgroundColor: "#18207E"}}*/>
        <Card.Title className="form-title" >Currency Converter</Card.Title>
        <Card.Body>
          <Form>
            <Form.Group className="form-convert">
              <Form.Label className="from-to">From</Form.Label> 
              <Form.Control
                type="number"
                min="0"
                value={this.state.amount}
                onChange={this.handleInput}
                placeholder="Enter amount"
              />
              <select
                name="base"
                value={this.state.base}
                onChange={this.handleSelect}
                className="select-cur"
              >
                {this.state.currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
                <option>USD</option>
              </select>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <div className="separate">
              <span class="outer-line"></span>
              <span class="fas fa fa-arrows-v" onClick={this.switchSelect} aria-hidden="true" style={{margin:"0 10px ", fontSize: "26px"}}></span>
              <span class="outer-line"></span>
            </div>
            <Form.Group className="form-convert">
              <Form.Label className="from-to">To</Form.Label>
              
              <Form.Control
                type="number"
                min="0"
                disabled
                value={this.state.result}
              />
              <select
                name="convertTo"
                value={this.state.convertTo}
                onChange={this.handleSelect}
                className="select-cur"
              >
                {this.state.currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
                <option>EUR</option>
              </select>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default Converter;
