/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import RNIap, {
  purchaseUpdatedListener,
  finishTransaction,
} from 'react-native-iap';
import {useDispatch} from 'react-redux';
import {items, subs} from '../conf';
import {increamentByAmount} from '../redux/pointSlice';

let purchaseUpdateSubscription = null;
let purchaseErrorSubscription = null;

export default function Buy() {
  // const [products, setProducts] = useState(fakeProducts);
  // const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [sub, setSub] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const initialIAP = useCallback(async () => {
    try {
      setIsLoading(true);
      await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
        const receipt = purchase.purchaseToken;
        if (receipt) {
          finishTransaction(purchase, true)
            .then(() => {
              handleCompletePurchase(purchase.productId);
            })
            .catch(() => {
              Alert.alert('purchase is failed', 'the purchase is failed');
            });
        }
      });

      const res = await RNIap.getProducts(items.map(item => item.sku));

      const subsResquest = await RNIap.getSubscriptions(subs.map(item => item.sku));

      setProducts(res);

      setSub(subsResquest);
    } catch (err) {
      Alert.alert(err.message);
      // console.warn(err.code, err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initialIAP();
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
      }
    };
  }, []);

  const handleCompletePurchase = productId => {
    switch (productId) {
      case items[0].sku:
        dispatch(increamentByAmount(items[0].value));
        break;
      case items[1].sku:
        dispatch(increamentByAmount(items[1].value));
        break;
      case items[2].sku:
        dispatch(increamentByAmount(items[2].value));
        break;
      case items[3].sku:
        dispatch(increamentByAmount(items[3].value));
        break;
      case items[4].sku:
        dispatch(increamentByAmount(items[4].value));
        break;
      case items[5].sku:
        dispatch(increamentByAmount(items[5].value));
        break;
      case items[6].sku:
        dispatch(increamentByAmount(items[6].value));
        break;
      case items[7].sku:
        dispatch(increamentByAmount(items[7].value));
        break;
      case subs[0].sku:
        dispatch(increamentByAmount(subs[0].value));
        break;
      case subs[1].sku:
        dispatch(increamentByAmount(subs[1].value));
        break;
      case subs[2].sku:
        dispatch(increamentByAmount(subs[2].value));
        break;
      case subs[3].sku:
        dispatch(increamentByAmount(subs[3].value));
        break;
      case subs[4].sku:
        dispatch(increamentByAmount(subs[4].value));
        break;
      case subs[5].sku:
        dispatch(increamentByAmount(subs[5].value));
        break;
      case subs[6].sku:
        dispatch(increamentByAmount(subs[6].value));
        break;
      case subs[7].sku:
        dispatch(increamentByAmount(subs[7].value));
        break;
      default:
        break;
    }
  };

  const handleRequestBuy = productId => {
    RNIap.requestPurchase(productId);
  };

  const handleRequestSubscription = productId => {
    RNIap.requestSubscription(productId);
  };

  return (
    <ScrollView
      style={styles.bg}
      contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.localizedPrice}>In-App Purchase</Text>
          <View style={styles.itemList3}>

            {products.map((product, index) => (
              <View style={styles.item3} key={product.productId}>
                <TouchableOpacity
                  onPress={() => handleRequestBuy(product.productId)}
                  style={styles.item3Content}>
                  <Text style={styles.price}>{product.localizedPrice}</Text>
                  <Text style={styles.descr}>{product.description}</Text>
                </TouchableOpacity>
              </View>
            ))}

          </View>
          <Text style={styles.localizedPrice}>Subscriptions</Text>
          <View style={styles.itemList3}>

            {sub.map((subItem, index) => (
              <View style={styles.item3} key={subItem.productId}>
                <TouchableOpacity
                  onPress={() => handleRequestSubscription(subItem.productId)}
                  style={styles.item3Content}>
                  <Text style={styles.price}>{subItem.localizedPrice}</Text>
                  <Text style={styles.descr}>{subItem.description}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  items: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemsSubs: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  item: {
    margin: 5,
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSub: {
    margin: 5,
    width: 150,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  d: {
    width: 30,
    height: 20,
    marginRight: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212121',
  },
  descr: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
  },
  itemList: {},
  item2: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    elevation: 2,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item2Body: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemList3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  item3: {
    width: '50%',
    padding: 5,
  },
  item3Content: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    elevation: 2,
    marginBottom: 10,

    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
