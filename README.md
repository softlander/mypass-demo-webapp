# Decentralized Identity Demo

## Demo Description

Here is the scenario:
> Murty, a graduate from the Delhi University with a Master of Technology degree, is working for CoolSoft. Now he wants to apply for a job at  AwesomeTech. AwesomeTech asks Murty to prove digitally his academic and professional credentials. Delhi University has already issued a signed immutable and verifiable digital degree. Similarly CoolSoft has issued a publicly verifiable tamper-proof digital identity card to Murty.
Murty can club these both verifiable credentials and sign it himself, before presenting to AwesomeTech. Now AwesomeTech can be first sure by verifying both of Murty's credentials before allowing him to proceed further in job application process.

## Build using `docker-compose`  

### Development Env

```bash
$ docker-compose up --build
$ docker-compose down -v --rmi local
```

### Production Env

```bash
$ docker-compose -f docker-compose-prod.yml up --build -d
$ docker-compose -f docker-compose-prod.yml logs
$ docker-compose -f docker-compose-prod.yml down -v --rmi local
```
