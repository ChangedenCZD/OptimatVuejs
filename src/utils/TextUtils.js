function fake(length) {
  let fakeArray = [];
  for (let i = 0; i < length; i++) {
    fakeArray.push('*');
  }
  return fakeArray.join('');
}

function fakeName(name) {
  const length = name.length;
  if (length > 8) {
    name = `${name.substr(0, 3)}${fake(length - 6)}${name.substr(length - 3, 3)}`;
  } else if (length > 4) {
    name = `${name.substr(0, 2)}${fake(length - 4)}${name.substr(length - 2, 2)}`;
  } else if (length > 2) {
    name = `${name.charAt(0)}${fake(length - 2)}${name.charAt(length - 1)}`;
  } else if (length > 1) {
    name = `${name.charAt(0)}${fake(1)}`;
  }
  return name;
}

function fakePhone(phone) {
  return `${phone.substr(0, 3)}${fake(4)}${phone.substr(phone.length - 4, 4)}`;
}

function isEmpty(str) {
  return str.length === 0;
}

module.exports = {
  fakeName, fakePhone, isEmpty
};
