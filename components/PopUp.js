import React, {useState, useEffect, useContext} from "react";
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ActivityIndicator,
} from "react-native";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {BASE_URL} from "../config";

const PopUp = ({ visible, onClose, nameProject, idProject }) => {
    const [eventWallet, setEventWallet] = useState({});
    const [amount, setAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState();
    const [buttonSelected, setButtonSelected] = useState("");
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [transactionVisible, setTransactionVisible] = useState(false);
    const [PossibleVote, setPossibleVote] = useState(false);
    const [notEnoughCoins, setNotEnoughCoins] = useState(false);
    const [loading, setLoading] = useState(false);
    const {userInfo, eventId} = useContext(AuthContext);
    const token = userInfo.token;
    const id_user = userInfo.id_user;

    const fetchEventWallet = () => {
        axios
            .get(
                `${BASE_URL}/event/balance/${eventId}`,
                {
                    headers: {
                        Authorization: token,
                        id: id_user,
                    },
                },
            )
            .then(res => {
                setEventWallet(res.data);
            })
            .catch(e => {
                console.log("error", e);
            });
    };

    useEffect(() => {
        fetchEventWallet()
    }, []);

    useEffect(() => {
        if (!visible) {
            setAmount(0);
            setButtonSelected("");
        }
    }, [visible]);

    useEffect(() => {
        if (amount > 0 && buttonSelected !== "") {
            setPossibleVote(true);
        } else {
            setPossibleVote(false);
        }
    }, [amount, buttonSelected]);

    useEffect(() => {
        if (amount > maxAmount) {
            setNotEnoughCoins(true);
        } else {
            setNotEnoughCoins(false);
        }
    }, [amount, maxAmount]);


    const increaseAmount = () => {
        if (buttonSelected !== "") {
            setAmount(amount + 1);
        }
    };

    const decreaseAmount = () => {
        if (amount > 0 && buttonSelected !== "") {
            setAmount(amount - 1);
        }
    };

    const setMaxAmountCoins = (coins, id) => {
        setMaxAmount(coins);
        setAmount(coins);
        setButtonSelected(id);
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
        setLoading(true); // Start the loading animation

        const requestData = {
            amount: amount,
            project: idProject,
            coin: buttonSelected,
        };

        const requestConfig = {
            headers: {
                Authorization: token,
                id: id_user,
            },
        };

        axios.post(`${BASE_URL}/event/vote/${eventId}`, requestData, requestConfig)
            .then(response => {
                setLoading(false);
                fetchEventWallet();
                setTransactionVisible(true);
            })
            .catch(error => {
                setLoading(false); // Stop the loading animation
                console.error('Error:', error);
            });
    };

    const handleTransactionClose = () => {
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

                        <Text style={styles.textProj}>Voting on {nameProject}</Text>
                        <Text style={styles.textSelectaCoin}>Please select a coin</Text>
                        <View style={styles.rowContainer}>
                            <Text style={styles.popupText}>Coin:</Text>
                            <View style={styles.buttonContainer}>
                                {Object.keys(eventWallet).map((key, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() =>
                                            setMaxAmountCoins(
                                                eventWallet[key].balance,
                                                eventWallet[key].id
                                            )
                                        }
                                        style={[
                                            styles.maxAmountButton,
                                            buttonSelected === eventWallet[key].id &&
                                            styles.maxAmountButtonSelected,
                                        ]}
                                    >
                                        {index === 0 && (
                                            <Image
                                                style={styles.img_coins_vote}
                                                source={require("../assets/coin.png")}
                                            />
                                        )}
                                        {index === 1 && (
                                            <Image
                                                style={styles.img_coins_vote}
                                                source={require("../assets/coin_red.png")}
                                            />
                                        )}
                                        {index === 2 && (
                                            <Image
                                                style={styles.img_coins_vote}
                                                source={require("../assets/coin_yellow.png")}
                                            />
                                        )}
                                        <Text
                                            style={[
                                                styles.maxAmountButtonText,
                                                buttonSelected === eventWallet[key].id &&
                                                styles.maxAmountButtonSelectedText,
                                            ]}
                                        >
                                            {eventWallet[key].balance}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
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
                                <TextInput
                                    style={styles.amountText}
                                    value={amount.toString()}
                                    onChangeText={(value) => {
                                        const numericValue = parseInt(value);
                                        if (!isNaN(numericValue) && numericValue >= 0) {
                                            setAmount(numericValue);
                                        }
                                    }}
                                    keyboardType="numeric"
                                    editable={PossibleVote}
                                />
                                <TouchableOpacity
                                    onPress={increaseAmount}
                                    style={styles.amountButton}
                                >
                                    <Text style={styles.amountButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {notEnoughCoins && (
                            <Text style={{textAlign: "center"}}>
                                Not enough coins. Please select a lower amount.
                            </Text>
                        )}
                        <View style={styles.viewButton}>
                            <TouchableOpacity
                                onPress={showConfirmation}
                                style={[
                                    styles.voteButton,
                                    !PossibleVote && styles.voteButtonDisabled,
                                    notEnoughCoins && styles.voteButtonDisabled,
                                ]}
                                disabled={!PossibleVote || notEnoughCoins}
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
                            Are you sure you want to invest {amount} coins in {nameProject}?
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

            {/* popup confirmação que foi concluída a transação*/}
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
            {loading && (
                <View style={styles.loadingContainer}>
                    {/* Replace this with your loading animation component */}
                    <ActivityIndicator size="large" color="#2F2E5F" />
                </View>
            )}
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
    width:10,
    height:10
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
    top: 15,
    left: 15,
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
    paddingRight:7,
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