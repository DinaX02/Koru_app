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
  const [button1Selected, setButton1Selected] = useState(false);
  const [button2Selected, setButton2Selected] = useState(false);
  const [button3Selected, setButton3Selected] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [transactionVisible, setTransactionVisible] = useState(false);
  const [PossibleVote, setPossibleVote] = useState(false); // pode votar ou n

  useEffect(() => {
    if (!visible) {
      setAmount(0);
    }
  }, [visible]);



 useEffect(() => {
    // Verificar se a quantidade é maior que 0 e pelo menos um botão foi selecionado
    if (amount > 0 && (button1Selected || button2Selected || button3Selected)) {
      setPossibleVote(true); // Habilitar o botão de voto
    } else {
      setPossibleVote(false); // Desabilitar o botão de voto
    }
  }, [amount, button1Selected, button2Selected, button3Selected]);



  const increaseAmount = () => {
    if ((amount < maxAmount) && (button1Selected || button2Selected || button3Selected)){
      setAmount(amount + 1);
    }
  };

  const decreaseAmount = () => {
    if ((amount > 0)&& (button1Selected || button2Selected || button3Selected)) {
      setAmount(amount - 1);
    }
  };

  const setMaxAmount100 = () => {
    setMaxAmount(100);
    setAmount(100);
    setButton1Selected(true);
    setButton2Selected(false);
    setButton3Selected(false);
  };

  const setMaxAmount50 = () => {
    setMaxAmount(50);
    setAmount(50);
    setButton1Selected(false);
    setButton2Selected(true);
    setButton3Selected(false);
  };

  const setMaxAmount10 = () => {
    setMaxAmount(10);
    setAmount(10);
    setButton1Selected(false);
    setButton2Selected(false);
    setButton3Selected(true);
  };
  
  const showConfirmation = () => {
    if (PossibleVote) {
      setConfirmVisible(true);
    }
  };


  const hideConfirmation = () => {
    setConfirmVisible(false);
  };

  const handleVote = () => {
    setConfirmVisible(false);
    setTransactionVisible(true);
  };

  
 handleTransactionClose = () => {
    setTransactionVisible(false);
    onClose();
  };

  return (
    <>
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
            <Text style={styles.textSelectaCoin}>Please select a coin</Text>
            <View style={styles.rowContainer}>
  
              <Text style={styles.popupText}>Coin:</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={setMaxAmount100}
                  style={[
                    styles.maxAmountButton,
                    button1Selected && styles.maxAmountButtonSelected,
                  ]}
                >
                  <Image
                    style={styles.img_coins_vote}
                    source={require("../assets/coin.png")}
                  />
                  <Text
                    style={[
                      styles.maxAmountButtonText,
                      button1Selected && styles.maxAmountButtonSelectedText,
                    ]}
                  >
                    100
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={setMaxAmount50}
                  style={[
                    styles.maxAmountButton,
                    button2Selected && styles.maxAmountButtonSelected,
                  ]}
                >
                  <Image
                    style={styles.img_coins_vote}
                    source={require("../assets/coin_red.png")}
                  />
                  <Text
                    style={[
                      styles.maxAmountButtonText,
                      button2Selected && styles.maxAmountButtonSelectedText,
                    ]}
                  >
                    50
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={setMaxAmount10}
                  style={[
                    styles.maxAmountButton,
                    button3Selected && styles.maxAmountButtonSelected,
                  ]}
                >
                  <Image
                    style={styles.img_coins_vote}
                    source={require("../assets/coin_yellow.png")}
                  />
                  <Text
                    style={[
                      styles.maxAmountButtonText,
                      button3Selected && styles.maxAmountButtonSelectedText,
                    ]}
                  >
                    10
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
    
            <View style={styles.rowContainer}>
            <Text style={styles.popupText2}>Amount:</Text>
            <View style={styles.amountContainer}>
              <TouchableOpacity
                onPress={decreaseAmount}
                style={styles.amountButton}
              >
                <Text style={styles.amountButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.amountText}>{amount}</Text>
              <TouchableOpacity
                onPress={increaseAmount}
                style={styles.amountButton}
              >
                <Text style={styles.amountButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            </View>
            <View style={styles.viewButton}>
  
            <TouchableOpacity
              onPress={showConfirmation}
              style={[
                styles.voteButton,
                !PossibleVote && styles.voteButtonDisabled,
              ]}
              disabled={!PossibleVote}
            >
              <Text style={styles.voteButtonText}>Vote</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

{/* popup confirmação yes or no*/}

      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.container}>
          <View style={styles.popup2}>
            <Text style={styles.confirmationText}>
              Are you sure you want to invest {amount} coins in Koru?
            </Text>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={handleVote}
                style={styles.confirmationButton}
              >
                <Text style={styles.confirmationButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={hideConfirmation}
                style={styles.confirmationButton}
              >
                <Text style={styles.confirmationButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

{/* popup confirmação  que foi conluida a transação*/}

      <Modal visible={transactionVisible} transparent animationType="fade">
        <View style={styles.container}>
          <View style={styles.popup3}>
            <Text style={styles.textProj}>Transaction complete</Text>
            <Text style={styles.popupValidationFinal}>
              Your coins went through!
            </Text>
            <TouchableOpacity
              onPress={handleTransactionClose}
              style={styles.closeButton}
            >
              <Image
                style={styles.closeButtonText}
                source={require("../assets/exit.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
  popup2:{
    backgroundColor: "white",
    width: 300,
    padding: 20,
    borderRadius: 20,
    height: 180,
    justifyContent:"center",
  },  
  popup3:{
    backgroundColor: "white",
    width: 300,
    padding: 20,
    borderRadius: 20,
    height: 180,
    justifyContent:"center",
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

  voteButtonText:{
    color:"white"
  },

  popupText: {
    marginTop: 50,
    color: "#2F2E5F",
    fontWeight: "bold",
  },
  
  textSelectaCoin:{ 
    color: "#2F2E5F",
  textAlign:"center",
  marginTop:10,
},
  popupText2: {
    marginTop: 20,
    color: "#2F2E5F",
    fontWeight: "bold",
    justifyContent:"flex-start",
  },
  popupValidationFinal:{   
    marginTop: 20,
    color: "#2F2E5F",
  textAlign:"center"
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
    justifyContent: "center",
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
  voteButton: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#2F2E5F",
    color: "white",
    alignSelf: "center",
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
    marginTop: 13,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 15,
    flex: 1,
    alignItems: "center",
  },
  maxAmountButton: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2F2E5F",
  },
  maxAmountButtonText: {
    fontWeight: "bold",
    color: "#2F2E5F",
  },
  maxAmountButtonSelected: {
    backgroundColor: "#2F2E5F",
  },
  maxAmountButtonSelectedText: {
    color: "white",
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop:5,
    marginLeft:10,
  },
  confirmationText: {
    color: "#2F2E5F",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:"center",
  },
  confirmationButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmationButton: {
    backgroundColor: "#2F2E5F",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  confirmationButtonText: {
    fontWeight: "bold",
    color: "white",
  }, 
   voteButtonDisabled: {
    backgroundColor: "#ccc",
  },
});

export default PopUp;