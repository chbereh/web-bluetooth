/**
 *
 */
$(function(){
    var requestDeviceParams = {
        filters: [
            {
                name: ["MYDEVICE"]
            }
        ],
        optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"]
    };
    
    $("#test").click(()=> {
        console.log("Running BLE Code");
        navigator.bluetooth.requestDevice(requestDeviceParams).then(device => {
            device.gatt.connect().then(gattServer=>{
                gattServer.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b").then(gattService=>{
                    gattService.getCharacteristic("beb5483e-36e1-b7f5-ea07361b26a8").then(gattCharacteristic=>{
                        gattCharacteristic.startNotifications().then(gattCharacteristic=>{
                            gattCharacteristic.addEventListener("characteristicvaluechanged", event=>{
                                var value = event.target.value.getUint8(0);
                                $("#notifiedValue").text("" + value);
                            });
                        });
                    });
                });
            });
        });
    });
});
 