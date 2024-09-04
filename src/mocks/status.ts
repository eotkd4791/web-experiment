export const enum Status {
  SUCCESS = "SUCCESS",
  BAD_REQUEST = "BAD_REQUEST",
  NETWORK_ERROR = "NETWORK_ERROR",
}

export const a = (status: keyof typeof Status) => {
  switch (status) {
    case Status.SUCCESS:
    case Status.BAD_REQUEST:
    case Status.NETWORK_ERROR:
  }
};
