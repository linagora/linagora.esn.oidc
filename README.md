# linagora.esn.seed

Seed module as basis to create other modules

## Install

*Note: The following instructions assumes that you have already installed OpenPaaS ESN in the path referenced by $ESN below.*

While waiting for a npm-based dependency injection handler, you have to install the module in OpenPaaS ESN like this:

**1. Clone**

```bash
git clone https://ci.linagora.com/linagora/lgs/openpaas/linagora.esn.seed.git
```

**2. Install it in OpenPaaS**

There is two way to install the model in OpenPaaS, so choose one of them:

- A. _Using symbolic links_

  The modules must be available in the `$ESN/modules` folder:

  ```bash
  ln -s path_to_module/linagora.esn.seed $ESN/modules/
  ```
- B. _Using npm link_

  Go inside the module repository:

  ```bash
  npm link
  ```

  Go inside OpenPaaS ESN repository:

  ```bash
  cd $ESN
  npm link linagora.esn.seed
  npm install
  ```

**2. Enable the module in the OpenPaaS ESN configuration file**

You must add the module in the modules section in `$ESN/config/default.NODE_ENV.json`. NODE_ENV is the environment variable used to define if the node application is running in 'production' or in 'development' (the default environment is 'development').
Copy the 'modules' array from `$ESN/config/default.json` into `$ESN/config/default.NODE_ENV.json` (`$ESN/config/default.development.json` or `$ESN/config/default.production.json`) and add the module name:

```
"modules": [
  "linagora.esn.core.webserver",
  "linagora.esn.core.wsserver",
  "linagora.esn.seed"
],
```

## Run

Once installed, you can start OpenPaaS ESN as usual. The **awesome module** is available in the application grid menu.
