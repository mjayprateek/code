curl -u admin:admin http://127.0.0.1:9090/content/mac/default/services/tenants/aod.json -F":operation=create" -F"tenantId=qaautomation" -F"admin_email=pkhatri@adobe.com" -F"admin_name=Prateek Khatri" -F"org_name=Aod Premium" -F"storage_quota=10" -F"number_of_licensed_users=10" -F"tenant_type=core";

curl -u admin:admin http://127.0.0.1:9090/content/mac/default/services/tenants/aod.json -F":operation=create" -F"tenantId=bpqatest" -F"admin_email=pkhatri@adobe.com" -F"admin_name=Prateek Khatri" -F"org_name=Aod Premium" -F"storage_quota=10" -F"number_of_licensed_users=10" -F"tenant_type=core";

cp -r ~/adobe/bp-ssl/ssl ~/adobe/brandportal/quickstart/crx-quickstart/;

curl -u admin:admin -F":operation=import" -F":contentType=json" -F":name=org.apache.felix.http" -F":content={'jcr:primaryType':'sling:OsgiConfig','org.apache.felix.https.keystore.password':'password','org.apache.felix.https.nio':true,'org.apache.felix.https.keystore.key':'cqse','org.osgi.service.http.port.secure':8443,'org.apache.felix.https.keystore':'crx-quickstart/ssl/cq.keystore','org.apache.felix.https.keystore.key.password':'password','org.apache.felix.https.enable':true}" http://localhost:9090/apps/system/config.author;

curl -u admin:admin http://127.0.0.1:9090/content/mac/default/services/tenants/aod.json -F":operation=create" -F"tenantId=testindexing" -F"admin_email=pkhatri@adobe.com" -F"admin_name=Prateek Khatri" -F"org_name=Aod Premium" -F"storage_quota=10" -F"number_of_licensed_users=10" -F"tenant_type=core";

curl -u admin:admin -F file=@"packages/mac-config.zip" -F name="Mac Config & Externalizer"  -F force=true -F install=true http://localhost:9090/crx/packmgr/service.jsp

keytool -genkeypair -keyalg RSA -validity 3650 -alias aem -keystore aem.keystore  -keypass key_password -storepass  store_password -dname "CN=Host Name, OU=Group Name, O=Company Name,L=City Name, S=State, C=Country_ Code"


