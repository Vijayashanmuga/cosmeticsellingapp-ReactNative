import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import your product images
import samsungImage from "./assets/1.png";
import macbookImage from "./assets/2.png";
import tableImage from "./assets/3.png";
import nikeImage from "./assets/4.png";
import a5Image from "./assets/5.png";
import a6Image from "./assets/6.png";
import a7Image from "./assets/7.png";
import a8Image from "./assets/8.png";
import a9Image from "./assets/9.png";
import a10Image from "./assets/10.png";

const ECommerceApp = () => {
  const [products, setProducts] = useState([
    { id: "1", name: "Neutrogene Mineral Sheers", price: 3400, image: samsungImage },
    { id: "2", name: "Lakme Absolute Skin Natureal mOUSSE golden", price: 10000, image: macbookImage },
    { id: "3", name: "Compacgt powder", price: 500, image: tableImage },
    { id: "4", name: "Foundation tube", price: 1700, image: nikeImage },
    { id: "5", name: "Sunscreen Serum", price: 499.99, image: a5Image },
    { id: "6", name: "PH lipstick", price: 297, image: a6Image },
    { id: "7", name: "Moisturizer", price: 509, image: a7Image },
    { id: "8", name: "spray", price: 509, image: a8Image },
    { id: "9", name: "Perfume set", price: 699, image: a9Image },
    { id: "10", name: "Hair color", price: 159, image: a10Image },
    
  ]);

  const [cart, setCart] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItemContainer} onPress={() => addToCart(item)}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productItemName}>{item.name}</Text>
      <Text style={styles.productItemPrice}>Rs:{item.price.toFixed(2)}</Text>
      <Text style={styles.addButtonText}>Add to Cart</Text>
      <Ionicons name="cart-outline" size={20} color="white" />
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>Rs:{item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Ionicons name="trash-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCheckout = () => {
    toggleModal();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Cosmetics Selling app</Text>

        <View style={styles.rowContainer}>
          <View style={styles.productsContainer}>
            <Text style={styles.sectionHeading}>Products</Text>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={renderProductItem}
              numColumns={2}
            />
          </View>
        </View>

        <View style={styles.cartContainer}>
          <Text style={styles.sectionHeading}>Shopping Cart</Text>
          {cart.length === 0 ? (
            <Text style={styles.emptyCartMessage}>Add at least one product to the cart.</Text>
          ) : (
            <FlatList data={cart} keyExtractor={(item) => item.id} renderItem={renderCartItem} />
          )}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                {cart.length === 0 ? "Add at least one product to the cart before proceeding." : "Congratulations! Your order is placed successfully."}
              </Text>
              <Button title="Close" onPress={toggleModal} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  rowContainer: {
    flexDirection: "row",
  },
  productsContainer: {
    flex: 1,
    marginRight: 10,
  },
  cartContainer: {
    flex: 1,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  productItemContainer: {
    flex: 1,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 15,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  productItemPrice: {
    fontSize: 14,
    marginBottom: 10,
    color: "#666",
  },
  addButtonText: {
    color: "white",
  },
  cartItemContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 15,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    backgroundColor: "#e53935",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  totalContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  emptyCartMessage: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default ECommerceApp;
