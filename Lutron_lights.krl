ruleset Lutron_lights {
  meta {
    use module io.picolabs.subscription alias subs

    shares __testing, data
    provides __testing, data
  }
  global {
    __testing = { "queries": [ { "name": "data" } ],
                  "events": [ { "domain": "lutron", "type": "lightsOn",
                                "attrs": [  ] },
                              { "domain": "lutron", "type": "lightsOff",
                                "attrs": [  ] },{
                                 "domain": "lutron", "type": "sendCMD",
                                "attrs": [ "cmd" ] }] }

  }
  rule Send_Command_lightsOn {
    select when lutron lightsOn
      telnet:sendCMD("#OUTPUT,27,1,100")
  }

  rule Send_Command_lightsOff {
    select when lutron lightsOff
      telnet:sendCMD("#OUTPUT,27,1,0")
  }
  
  rule Send_Command {
    select when lutron sendCMD
      telnet:sendCMD(event:attr("cmd"))
  }
}
