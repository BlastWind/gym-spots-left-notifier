# gym-spots-notifier
scrapes "how many spots is left info" from W&amp;M's gym website, configured with gcloud cron and twilio to automatically notify my friend and I on the status. 

# How to set up Google Cloud Cron 
 => Make a gcloud project
 
 => upload your function (mine is in index.js) to gcloud project -> gcloud functions 
 
 => gcloud project -> gcloud cloud scheduler => set up cron job (specify when to repeat using cron syntax, easier with: https://crontab.guru/)
 => All set 
 
# How to set up Twilio 
 => Make free Twilio account
 
 => Note that free Twilio account can only send to verified phone numbers
 
# How to set up this project

clone and install 
create your Twilio account
create a secrets.js file that 

`module.exports = {SID: YOUR TWILIO SID, TOKEN: YOUR TWILIO AUTH TOKEN}`