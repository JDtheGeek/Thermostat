describe('Thermostat', () => {
  let thermostat

  beforeEach(() => {
    thermostat = new Thermostat()
  })

  it('starts at 20 degrees', () => {
    expect(thermostat.getCurrentTemp()).toEqual(20)
  })

  it('has power saving mode on by default', () => {
    expect(thermostat.isPowerSaveOn()).toBe(true)
  })

  it('can switch PSM off', () => {
    thermostat.powerSaveOn()
    expect(thermostat.isPowerSaveOn()).toBe(true)
    thermostat.powerSaveOff()
    expect(thermostat.isPowerSaveOn()).toBe(false)
  })

  it('can switch PSM on', () => {
    thermostat.powerSaveOff()
    expect(thermostat.isPowerSaveOn()).toBe(false)
    thermostat.powerSaveOn()
    expect(thermostat.isPowerSaveOn()).toBe(true)
  })

  it('increases the temp with up()', () => {
    thermostat.up()
    expect(thermostat.getCurrentTemp()).toEqual(21)
  })

  it('decreases the temp with down()', () => {
    thermostat.down()
    expect(thermostat.getCurrentTemp()).toEqual(19)
  })

  it('has a minimum of 10 degrees', () => {
    for (let i = 0; i < 11; i += 1) {
      thermostat.down()
    }
    expect(thermostat.getCurrentTemp()).toEqual(10)
  })

  it('has a maximum of 25 degrees if PowerSave is on', () => {
    thermostat.powerSaveOn()
    for (let i = 0; i < 15; i += 1) {
      thermostat.up()
    }
    expect(thermostat.getCurrentTemp()).toEqual(25)
  })

  it('has a maximum of 32 degrees if PowerSave is off', () => {
    thermostat.powerSaveOff()
    for (let i = 0; i < 15; i += 1) {
      thermostat.up()
    }
    expect(thermostat.getCurrentTemp()).toEqual(32)
  })

  it('resets to the default temp of 20', () => {
    for (let i = 0; i < 15; i += 1) {
      thermostat.up()
    }
    thermostat.resetTemp()

    expect(thermostat.getCurrentTemp()).toEqual(20)
  })

  describe('displaying usage levels', () => {
    describe('if temp is lower than 18', () => {
      it("it is considered 'low-usage'", () => {
        for (let i = 0; i < 3; i += 1) {
          thermostat.down()
        }
        expect(thermostat.energyUsage()).toEqual('low-usage')
      })
    })

    describe('if the temp is between 18 and 25', () => {
      it("it returns 'medium-usage'", () => {
        expect(thermostat.energyUsage()).toEqual('medium-usage')
      })
    })

    describe('if the temperature is anything else', () => {
      it("it returns 'high-usage'", () => {
        thermostat.powerSaveOff()
        for (let i = 0; i < 6; i += 1) {
          thermostat.up()
        }
        expect(thermostat.energyUsage()).toEqual('high-usage')
      })
    })
  })
})
