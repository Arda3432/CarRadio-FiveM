RegisterCommand("carradio", function()
    SetNuiFocus(true, true) 
    SendNUIMessage({ action = "open" })
end)

RegisterNUICallback("playRadio", function(data, cb)
    local url = data.url
    if url and url ~= "" then
        SendNUIMessage({ action = "play", url = url })
        SetNuiFocus(false, false)
        cb("ok")
    else
        cb("error")
    end
end)

RegisterNUICallback("close", function(_, cb)
    SendNUIMessage({ action = "stop" }) 
    SetNuiFocus(false, false)           
    cb("ok")
end)

CreateThread(function()
    while true do
        Wait(500)
        local ped = PlayerPedId()
        if not IsPedInAnyVehicle(ped, false) then
            SendNUIMessage({ action = "stop" }) 
            SetNuiFocus(false, false)           
        end
    end
end)
