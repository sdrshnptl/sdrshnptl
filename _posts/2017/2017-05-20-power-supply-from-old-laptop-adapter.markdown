---
layout: "post"
title: "Power supply from old laptop adapter"
date: "2017-05-20 22:52"
---

Laptop adapter are very efficient to deliver voltage and current up to 24V/3.5A
But How to turn odd power rating adapter into desired one?



This is circuit board that I've opened,

![Laptop_adapter_circuitboard](/images/Laptop_adapter_circuitboard.jpg)

power adapter consist of three main part

1. SMPS.(Switch Mode Power supply)
2. Optocoupler.
3. Feedback and control circuit.

Main functionality of delivering voltage and current is maintain by 3rd part.

How it's work?

Part of feedback circuit is made by Optocoupler and adjustable shunt regulators,
Here "TL432" is used in this module.

![alt text](/images/tl431.gif)

which drives Optocoupler when it recieve voltage from resistor divider circuit of 2.5V.
TL431 is transistor look like device, has three terminal named - Anode, Cathode, Referance.

Voltage divider values
Vcc to Vref 1.45K
Vref to GND 10K

This combination gives approx 2.45V to TL431.
i replace 10K resistor with preset for variying voltage of Vref.

![alt text](/images/PowerAdapter.jpg)
