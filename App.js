import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  NativeBaseProvider,
  VStack,
  FormControl,
  Heading,
  Text,
  Box,
  Input,
  ScrollView,
  View,
  Checkbox,
  HStack,
  Progress,
} from 'native-base';
import { RefreshControl } from 'react-native';
export default function App() {
  const [iKnow, setIKnow] = useState(false);
  const [input, setInput] = useState({ adRevenue: 0, adSpend: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const handleRoas = useCallback(
    (field, value) => {
      setInput({ ...input, [field]: value });
    },
    [input]
  );

  if (iKnow && input.adSpend != '') {
    input.adRevenue = ((parseInt(input.adSpend) / 100) * 800).toString();
  }

  let roas = 0;
  let adRevenue = input.adRevenue;
  let adSpend = input.adSpend;
  if (adSpend != '' || adRevenue != '' || parseInt(adSpend) > 1) {
    roas = (parseInt(adRevenue) / parseInt(adSpend)) * 100;
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setInput({});
    setIKnow(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <NativeBaseProvider>
      <ScrollView
        flex={1}
        bg="white"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View flex={1} m={6}>
          <View alignItems="center" p={5} flex={1} bg="white">
            <Heading>
              <Text textAlignVertical={'center'} color="primary.500">
                Return On Ad Spend
              </Text>
            </Heading>
            <Heading>
              <Text textAlignVertical={'center'}>CALCULATOR</Text>
            </Heading>
          </View>
          <Box
            shadow={3}
            flex={1}
            bg="#fff"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
          >
            <FormControl mb={5}>
              <VStack space={4} mt="5" m={3}>
                <FormControl.Label>Biaya Iklan/Promosi (Rp)</FormControl.Label>
                <Input
                  autoFocus={true}
                  value={input.adSpend}
                  isRequired={true}
                  variant="underlined"
                  size="xl"
                  placeholder="cth. 1000000"
                  onChangeText={(value) => handleRoas('adSpend', value)}
                  keyboardType="numeric"
                />
                <HStack space={6}>
                  <Checkbox
                    shadow={2}
                    value={true}
                    accessibilityLabel="Saya mengetahui pendapatan saya"
                    onChange={(value) => setIKnow(value)}
                  >
                    <Text color="grey">
                      Saya tidak mengetahui pendapatan saya
                    </Text>
                  </Checkbox>
                </HStack>
                <FormControl.Label>
                  {iKnow === true ? 'Target' : ''} Pendapatan dari Iklan/Promosi
                  (Rp)
                </FormControl.Label>
                <Input
                  value={input.adRevenue}
                  isRequired={true}
                  isDisabled={iKnow === true ? true : false}
                  variant="underlined"
                  size="xl"
                  placeholder="cth. 2000000"
                  onChangeText={(value) => handleRoas('adRevenue', value)}
                  keyboardType="numeric"
                />
                {Number.isInteger(parseInt(roas)) && roas !== 0 ? (
                  <>
                    <FormControl.Label>
                      {iKnow === true ? 'Target' : ''} Return on Ad Spend (ROAS
                      target 800%)
                    </FormControl.Label>
                    <Heading>
                      <Text
                        color={
                          parseInt(roas) < 400
                            ? 'danger.500'
                            : parseInt(roas) < 800
                            ? 'warning.500'
                            : 'emerald.500'
                        }
                      >
                        {roas == Math.floor(roas)
                          ? roas.toString()
                          : roas.toFixed(2).toString()}
                      </Text>
                      <Text color="gray.400">/</Text>
                      <Text color="gray.400">800 %</Text>
                    </Heading>
                    <Progress
                      size="lg"
                      colorScheme={
                        parseInt(roas) < 400
                          ? 'danger'
                          : parseInt(roas) < 800
                          ? 'warning'
                          : 'emerald'
                      }
                      max={1000}
                      value={parseInt(roas)}
                    />
                    <View>
                      <HStack space={16}>
                        <VStack space={1} alignItems="center">
                          <Box w={3} h={3} bg={'emerald.500'}></Box>
                          <Text color={'gray.400'} fontSize={'xs'}>
                            Sangat Bagus
                          </Text>
                        </VStack>
                        <VStack space={1} alignItems="center">
                          <Box w={3} h={3} bg={'warning.500'}></Box>
                          <Text color={'gray.400'} fontSize={'xs'}>
                            Hati-hati
                          </Text>
                        </VStack>
                        <VStack space={1} alignItems="center">
                          <Box w={3} h={3} bg={'danger.500'}></Box>
                          <Text color={'gray.400'} fontSize={'xs'}>
                            Bahaya
                          </Text>
                        </VStack>
                      </HStack>
                    </View>
                  </>
                ) : (
                  <></>
                )}
              </VStack>
            </FormControl>
            <StatusBar hidden={true} />
          </Box>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}
