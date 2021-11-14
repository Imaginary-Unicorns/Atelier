import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 1000,
      maxVUs: 1000,
    },
  }
  // stages: [
  //   { duration: '30s', target: 100 },
  //   { duration: '30s', target: 1000 },
  //   { duration: '30s', target: 10000 },
  // ],
};

export default function () {
  const res = http.get('http://localhost:3000/799999/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}