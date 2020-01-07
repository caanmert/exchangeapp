import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

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
      <Container>
        <Card className="text-center" style={{ width: "18rem" }}>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>From</Form.Label>
                <select
                  name="base"
                  value={this.state.base}
                  onChange={this.handleSelect}
                >
                  {this.state.currencies.map(currency => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                  <option>USD</option>
                </select>
                <Form.Control
                  type="number"
                  value={this.state.amount}
                  onChange={this.handleInput}
                  placeholder="Enter amount"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>To</Form.Label>
                <select
                  name="convertTo"
                  value={this.state.convertTo}
                  onChange={this.handleSelect}
                >
                  {this.state.currencies.map(currency => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                  <option>EUR</option>
                </select>
                <Form.Control
                  type="number"
                  disabled
                  value={this.state.result}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Converter;
