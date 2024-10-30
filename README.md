# How to add a version docs for OHIF

1. Grab the docs from the OHIF repo and put them in the proper folder with correct version number


from OHIF 

![alt text](assets/ohfi-docs.png)

2. Then copy the proper settings for docusaurus and run yarn build

3. Run `yarn server` to test the build

4. In OHIF Cloudflare account, create a `page`, cd into build folder, zip all the files and upload the zip into page

![alt text](assets/cloudflare.png)

(ask Alireza for credentials)

5. Add custom domain of version.docs.ohif.org for instance `v1.docs.ohif.org`
