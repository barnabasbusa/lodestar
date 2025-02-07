import {ChainForkConfig} from "@lodestar/config";
import {
  ApiClientMethods,
  HttpClient,
  HttpClientModules,
  HttpClientOptions,
  IHttpClient,
} from "../../utils/client/index.js";
import {Endpoints} from "../routes/index.js";

import * as beacon from "./beacon.js";
import * as configApi from "./config.js";
import * as debug from "./debug.js";
import * as events from "./events.js";
import * as lightclient from "./lightclient.js";
import * as lodestar from "./lodestar.js";
import * as node from "./node.js";
import * as proof from "./proof.js";
import * as validator from "./validator.js";

type ClientModules = HttpClientModules & {
  config: ChainForkConfig;
  httpClient?: IHttpClient;
};

export type ApiClient = {[K in keyof Endpoints]: ApiClientMethods<Endpoints[K]>};

/**
 * REST HTTP client for all routes
 */
export function getClient(opts: HttpClientOptions, modules: ClientModules): ApiClient {
  const {config} = modules;
  const httpClient = modules.httpClient ?? new HttpClient(opts, modules);

  return {
    beacon: beacon.getClient(config, httpClient),
    config: configApi.getClient(config, httpClient),
    debug: debug.getClient(config, httpClient),
    events: events.getClient(config, httpClient.baseUrl),
    lightclient: lightclient.getClient(config, httpClient),
    lodestar: lodestar.getClient(config, httpClient),
    node: node.getClient(config, httpClient),
    proof: proof.getClient(config, httpClient),
    validator: validator.getClient(config, httpClient),
  };
}
