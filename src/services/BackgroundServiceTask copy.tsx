import BackgroundJob from 'react-native-background-actions';
import {Linking, Platform} from 'react-native';

BackgroundJob.on('expiration', () => {
  console.log('iOS: I am being closed!');
});

const taskRandom = async (taskData: any) => {
  if (Platform.OS === 'ios') {
    console.warn(
      'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
      'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
    );
  }
  await new Promise(async resolve => {
    const {delay} = taskData;
    console.log(BackgroundJob.isRunning(), delay);
    for (let i = 0; BackgroundJob.isRunning(); i++) {
      /*
        await AxiosClient.post(
          `/api/vehicle/location/${user.vehicle_id}`,
          {
            lat: latitude,
            lng: longitude,
          },
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              'content-type': 'multipart/form-data',
              // 'content-type': 'application/json',
            },
          },
        )
          .then(response => {
            console.log('Location send');
          })
          .catch(error => {
            console.warn('LOCATION ERR  ' + error.message);
          });
          */
      console.log('Konumunuz -> ');
      await BackgroundJob.updateNotification({taskDesc: 'Konumunuz -> ' + i});
      /*
      (async () => {
            Geolocation.getCurrentPosition(async info => {
              setLatitude(info.coords.latitude);
              setLongitude(info.coords.longitude);
              await AxiosClient.post(
                `/api/vehicle/location/${user.vehicle_id}`,
                {
                  lat: latitude,
                  lng: longitude,
                },
                {
                  headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                    'content-type': 'multipart/form-data',
                    // 'content-type': 'application/json',
                  },
                },
              )
                .then(response => {
                  console.log('Location send');
                })
                .catch(error => {
                  console.warn('LOCATION ERR  ' + error.message);
                });

            });
      });
            */
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'TMS',
  taskTitle: 'Konum Takibi',
  taskDesc: 'Konumunuz takip ediliyor, lütfen uygulamayı kapatmayın.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'exampleScheme://chat/jane',
  parameters: {
    delay: 3000,
  },
};

function handleOpenURL(evt: any) {
  console.log(evt.url);
}

Linking.addEventListener('url', handleOpenURL);
const usingHermes =
  typeof HermesInternal === 'object' && HermesInternal !== null;

let playing = BackgroundJob.isRunning();

const toggleBackground = async () => {
  playing = !playing;
  if (true) {
    try {
      await BackgroundJob.start(taskRandom, options);
    } catch (e) {
      console.log('Error', e);
    }
  } else {
    console.log('Stop background service');
    await BackgroundJob.stop();
  }
};

export default toggleBackground;
//   toggleBackground();
