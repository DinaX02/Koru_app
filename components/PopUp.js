import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";

const PopUp = ({ visible, onClose }) => {
  const [amount, setAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(100);

  useEffect(() => {
    if (!visible) {
      setAmount(0);
    }
  }, [visible]);

  const increaseAmount = () => {
    if (amount < maxAmount) {
      setAmount(amount + 1);
    }
  };

  const decreaseAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const setMaxAmount100 = () => {
    setMaxAmount(100);
    setAmount(100);
  };

  const setMaxAmount50 = () => {
    setMaxAmount(50);
    setAmount(50);
  };

  const setMaxAmount10 = () => {
    setMaxAmount(10);
    setAmount(10);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.popup}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Image
              style={styles.closeButtonText}
              source={require("../assets/exit.png")}
            />
          </TouchableOpacity>

          <Text style={styles.textProj}>Voting on Koru</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.popupText}>Coin:</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={setMaxAmount100}
                style={styles.maxAmountButton}
              >
                <Image
                  style={styles.img_coins_vote}
                  source={require("../assets/coin.png")}
                />
                <Text style={styles.maxAmountButtonText}>100</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={setMaxAmount50}
                style={styles.maxAmountButton}
              >
                <Image
                  style={styles.img_coins_vote}
                  source={require("../assets/coin_red.png")}
                />
                <Text style={styles.maxAmountButtonText}>50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={setMaxAmount10}
                style={styles.maxAmountButton}
              >
                <Image
                  style={styles.img_coins_vote}
                  source={require("../assets/coin_yellow.png")}
                />
                <Text style={styles.maxAmountButtonText}>10</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.popupText2}>Amount:</Text>
          <View style={styles.amountContainer}>
            <TouchableOpacity onPress={decreaseAmount} style={styles.amountButton}>
              <Text style={styles.amountButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.amountText}>{amount}</Text>
            <TouchableOpacity onPress={increaseAmount} style={styles.amountButton}>
              <Text style={styles.amountButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.buttonpopUpVote}>
              <Text style={styles.textbutoonPopup}>Vote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  img_coins_vote: {
    marginRight: 5,
  },
  popup: {
    backgroundColor: "white",
    width: 300,
    padding: 20,
    borderRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    flexDirection: "row",
  },
  closeButtonText: {
    marginRight: 50,
  },
  popupText: {
    marginTop: 50,
    color: "#2F2E5F",
    fontWeight: "bold",
  },
  popupText2: {
    marginTop: 20,
    color: "#2F2E5F",
    fontWeight: "bold",
  },
  textProj: {
   textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "#2F2E5F",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent:"center",
    
  },
  buttonpopUpVote: {
    backgroundColor: "#2F2E5F",
    borderRadius: 20,
    color: "white",
  },
  textbutoonPopup: {
    fontWeight: "bold",
    color: "white",
  },
  viewButton: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#2F2E5F",
    color: "white",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  amountButton: {
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  amountButtonText: {
    fontWeight: "bold",
    color: "#2F2E5F",
    fontSize: 20,
  },
  amountText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 10,
    marginLeft:15,
    flex: 1,
    alignItems: "center",
  },
  maxAmountButton: {
    backgroundColor: "#2F2E5F",
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  maxAmountButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10, }
});


export default PopUp;