// 纯JS省市区三级联动
var addressInit = function(_cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea) {
    var cmbProvince = $('.' + _cmbProvince)[0];
    var cmbCity = $('.' + _cmbCity)[0];
    var cmbArea = $('.' + _cmbArea)[0];

    function cmbSelect(cmb, str) {
        for (var i = 0; i < cmb.options.length; i++) {
            if (cmb.options[i].value == str) {
                cmb.selectedIndex = i;
                return;
            }
        }
    }

    function cmbAddOption(cmb, str, obj) {
        var option = document.createElement("OPTION");
        cmb.options.add(option);
        option.innerHTML = str;
        option.value = str;
        option.obj = obj;
    }

    function changeCity() {
        cmbArea.options.length = 0;
        if (cmbCity.selectedIndex == -1) return;
        var item = cmbCity.options[cmbCity.selectedIndex].obj;
        for (var i = 0; i < item.areaList.length; i++) {
            cmbAddOption(cmbArea, item.areaList[i], null);
        }
        cmbSelect(cmbArea, defaultArea);
    }

    function changeProvince() {
        cmbCity.options.length = 0;
        cmbCity.onchange = null;
        if (cmbProvince.selectedIndex == -1) return;
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
        for (var i = 0; i < item.cityList.length; i++) {
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);
        }
        cmbSelect(cmbCity, defaultCity);
        changeCity();
        cmbCity.onchange = changeCity;
    }

    for (var i = 0; i < provinceList.length; i++) {
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);
    }
    cmbSelect(cmbProvince, defaultProvince);
    changeProvince();
    cmbProvince.onchange = changeProvince;
};

var provinceList = [
    {
    name: '江西',
    cityList: [{
        name: '南昌市',
        areaList: [ '东湖区', '西湖区', '青云谱区', '新建区', '湾里区', '青山湖区', '南昌县', '安义县', '进贤县']
    }, {
        name: '景德镇市',
        areaList: [ '昌江区', '珠山区', '浮梁县', '乐平市']
    }, {
        name: '萍乡市',
        areaList: [ '安源区', '湘东区', '莲花县', '上栗县', '芦溪县']
    }, {
        name: '九江市',
        areaList: [ '濂溪区', '浔阳区', '九江县', '武宁县', '修水县', '永修县', '德安县', '庐山市', '都昌县', '湖口县', '彭泽县', '瑞昌市']
    }, {
        name: '新余市',
        areaList: [ '渝水区', '分宜县']
    }, {
        name: '鹰潭市',
        areaList: [ '月湖区', '余江县', '贵溪市']
    }, {
        name: '赣州市',
        areaList: [ '章贡区', '赣县区', '南康区','信丰县', '大余县', '上犹县', '崇义县', '安远县', '龙南县', '定南县', '全南县', '宁都县', '于都县', '兴国县', '会昌县', '寻乌县', '石城县', '瑞金市']
    }, {
        name: '吉安市',
        areaList: [ '吉州区', '青原区', '吉安县', '吉水县', '峡江县', '新干县', '永丰县', '泰和县', '遂川县', '万安县', '安福县', '永新县', '井冈山市']
    }, {
        name: '宜春市',
        areaList: [ '袁州区', '奉新县', '万载县', '上高县', '宜丰县', '靖安县', '铜鼓县', '丰城市', '樟树市', '高安市']
    }, {
        name: '抚州市',
        areaList: [ '临川区','东乡区', '南城县', '黎川县', '南丰县', '崇仁县', '乐安县', '宜黄县', '金溪县', '资溪县',  '广昌县']
    }, {
        name: '上饶市',
        areaList: [ '信州区', '广丰区', '上饶县', '玉山县', '铅山县', '横峰县', '弋阳县', '余干县', '鄱阳县', '万年县', '婺源县', '德兴市']
    },{
        name:'省直辖县级行政单位',
        areaList:['共青城市']
    }]
}
]